<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Book $book)
    {
        return Inertia::render(
            'chapters/create',
            ['book' => $book]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'content' => ['required', 'string'],
        ]);

        $book->chapters()->create([
            ...$validated,
            'slug' => slugify($validated['title'])
        ]);

        return to_route(
            'books.show',
            ['book' => $book->id],
        );
    }

    /**
     * Display the specified resource.
     */
    // public function show(Chapter $chapter)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chapter $chapter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chapter $chapter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chapter $chapter)
    {
        //
    }
}
