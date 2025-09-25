<?php

namespace App\Http\Controllers;

use App\BookStatus;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    private function slugify(string $str)
    {
        return Str::slug($str);
    }

    /**
     * Display a listing of the resource.
     */
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('books/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255']
        ]);

        $request->user()->books()->create([
            ...$validated,
            'slug' => $this->slugify($validated['title']),
        ]);

        return to_route('books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return Inertia::render('books/show', ['book' => $book]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $bookStatus = $book && $book->status === BookStatus::Draft->value
            ? [BookStatus::Draft->value, BookStatus::Pending->value]
            : array_values(array_diff(BookStatus::values(), [BookStatus::Draft->value, BookStatus::Pending->value]));

        return Inertia::render(
            'books/edit',
            [
                'book' => $book,
                'bookStatus' => $bookStatus,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'status' => ['in:' . implode(',', BookStatus::values())],
        ]);
        // dd($validated);

        $book->fill($validated);

        if ($book->isDirty('title')) {
            $book->slug = $this->slugify($validated['title']);
        }

        $book->save();

        return to_route('books.show', ['book' => $book->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
