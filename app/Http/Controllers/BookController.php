<?php

namespace App\Http\Controllers;

use App\AudTypeEnum;
use App\BookStatusEnum;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    private function slugify(string $str)
    {
        return Str::slug($str);
    }

    // show list book page
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Book::class);
        $books = $request->user()->books;
        // $books = Book::all();

        return Inertia::render(
            'books/index',
            [
                'listBook' => $books
            ]
        );
    }

    // show book create page
    public function create(Request $request)
    {
        Gate::authorize('create', Book::class);
        return Inertia::render(
            'books/create',
            ['audType' => AudTypeEnum::values()]
        );
    }

    // store book into db
    public function store(Request $request)
    {
        Gate::authorize('create', Book::class);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'aud_type' => ['required', 'in:' . implode(',', AudTypeEnum::values())],
        ]);

        $request->user()->books()->create([
            ...$validated,
            'slug' => $this->slugify($validated['title']),
        ]);

        return to_route('books.index')
            ->with('success', 'Create success.');
    }

    // show detail book
    public function show(Book $book)
    {
        Gate::authorize('view', $book);
        return Inertia::render('books/show', ['book' => $book]);
    }

    // show edit book page
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
                'audType' => AudTypeEnum::values(),
            ]
        );
    }

    // update book into db
    public function update(Request $request, Book $book)
    {
        Gate::authorize('update', $book);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'aud_type' => ['required', 'in:' . implode(',', AudTypeEnum::values())],
            'status' => ['required', 'in:' . implode(',', BookStatusEnum::values())],
        ]);

        $book->fill($validated);

        if ($book->isDirty('title')) {
            $book->slug = $this->slugify($validated['title']);
        }

        $book->save();

        return to_route('books.show', ['book' => $book->id])
            ->with('success', 'Update success.');
    }

    // delete book
    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);

        if ($book->status === BookStatusEnum::Draft->value || $book->status === BookStatusEnum::Pending->value)
            // forceDelete if status is Draft or Pending
            $book->forceDelete();
        else
            // soft delete
            $book->delete();

        return to_route('books.index')
            ->with('success', 'Delete success.');
    }

    // change cover image of book
    public function updateBookCover(Request $request, Book $book)
    {
        $request->validate([
            'cover_image' => ['required', 'image', 'mimes:png,jpg', 'max:2048'],
        ]);

        if ($request->hasFile('cover_image')) {
            // delete old book cover
            if (
                $book->cover_image
                && Storage::disk('public')->exists(path: $book->cover_image)
            ) {
                Storage::disk('public')->delete($book->cover_image);
            }
            // store new book cover
            $file = $request->file('cover_image');
            $filename = time() . "-" . Str::random(5) . ".{$file->extension()}";
            $book->cover_image = $file->storeAs('book_cover', $filename, 'public');
            $book->save();
        } else
            // back to previous route with error message
            return back()->with('error', 'Update cover image failure.');

        return to_route('books.show', ['book' => $book->id])
            ->with('success', 'Update success.');
    }
}
