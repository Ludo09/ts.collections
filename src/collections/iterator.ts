export module collections {
    export interface Iterator<E> {
        // Returns true if the iteration has more elements. (In other words, returns true if next() would return an element rather than throwing an exception.)
        hasNext(): boolean;

        // Returns the next element in the iteration.
        // throws NoSuchElementException - if the iteration has no more elements
        next(): E;

        // Removes from the underlying collection the last element returned by this iterator (optional operation). This method can be called only once per call to next(). The behavior of an iterator is unspecified if the underlying collection is modified while the iteration is in progress in any way other than by calling this method.
        // throws IllegalStateException - if the next method has not yet been called, or the remove method has already been called after the last call to the next method
        remove();
    }
}