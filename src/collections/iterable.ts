/// <reference path="iterator.ts"/>

import m = require("./iterator");

export module collections {
    export interface Iterable<T> {
        // Returns an iterator over a set of elements of type T.
        iterator() : m.collections.Iterator<T>;
    }
}