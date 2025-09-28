<?php

namespace App\Http\Controllers;

use App\AudTypeEnum;
use App\BookStatusEnum;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    private function slugify(string $str)
    {
        return Str::slug($str);
    }

    public function index()
    {
        $books = Book::all();
        return Inertia::render(
            'books/index',
            [
                'listBook' => $books
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'books/create',
            ['audType' => AudTypeEnum::values()]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'aud_type' => ['in:' . implode(',', AudTypeEnum::values())],
        ]);

        $request->user()->books()->create([
            ...$validated,
            'slug' => $this->slugify($validated['title']),
        ]);

        return to_route('books.index');
    }

    public function show(Book $book)
    {
        Gate::authorize('view', $book);
        return Inertia::render('books/show', ['book' => $book]);
    }

    public function edit(Book $book)
    {
        Gate::authorize('update', $book);

        $bookStatus = $book && $book->status === BookStatusEnum::Draft->value
            ? [BookStatusEnum::Draft->value, BookStatusEnum::Pending->value]
            : array_values(array_diff(
                BookStatusEnum::values(),
                [BookStatusEnum::Draft->value, BookStatusEnum::Pending->value]
            ));

        return Inertia::render(
            'books/edit',
            [
                'book' => $book,
                'bookStatus' => $bookStatus,
            ]
        );
    }

    public function update(Request $request, Book $book)
    {
        Gate::authorize('update', $book);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'status' => ['in:' . implode(',', BookStatusEnum::values())],
        ]);

        $book->fill($validated);

        if ($book->isDirty('title')) {
            $book->slug = $this->slugify($validated['title']);
        }

        $book->save();

        return to_route('books.show', ['book' => $book->id]);
    }

    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);

        if ($book->status === BookStatusEnum::Draft->value || $book->status === BookStatusEnum::Pending->value)
            $book->forceDelete();
        else
            $book->delete();

        return to_route('books.index');
    }
}
