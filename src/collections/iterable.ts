import {collections as iter} from './iterator';

export module collections {
    export interface Iterable<T> {
        // Returns an iterator over a set of elements of type T.
        iterator() : iter.Iterator<T>;
    }
}