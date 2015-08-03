/*
/// <reference path="collection.ts"/>
/// <reference path="iterator.ts"/>
*/
import c = require("./collection");
import i = require("./iterator");

export module collections {
    export class List<E> implements c.collections.Collection<E> {
        private _elements:Array<E> = [];

        public size():number {
            return this._elements.length;
        }

        public empty():boolean {
            return this._elements.length == 0;
        }

        // Appends the specified element to the end of this list.
        public append(e:E) {
            this._elements.push(e);
        }

        // Returns the element at the specified position in this list.
        public get(index:number):E {
            if (index < 0 || index >= this.size())
                throw new Error("Index out of bounds");

            return this._elements[index];
        }

        // Replaces the element at the specified position in this list with the specified element.
        public set(index:number, e:E) {
            if (index < 0 || index >= this.size())
                throw new Error("Index out of bounds");

            this._elements[index] = e;
        }

        // Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
        public add(index:number, e:E) {
            if (index < 0 || index >= this.size())
                throw new Error("Index out of bounds");

            this._elements.splice(index, 0, e);
        }

        // Removes all of the elements from this list. The list will be empty after this call returns.
        public clear() {
            this._elements.length = 0;
        }

        // Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
        public removeAt(index:number) {
            if (index < 0 || index >= this.size())
                throw new Error("Index out of bounds");

            this._elements.splice(index, 1);
        }

        // Removes the specified element if found in the list. Shifts any subsequent elements to the left.
        public remove(e:E) {
            var index:number = this.indexOf(e);
            if (index > -1)
                this._elements.splice(index, 1);
        }

        // Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
        public indexOf(e:E) {
            for (var i = 0; i < this._elements.length; i++)
                if (this._elements[i] === e)
                    return i;
            return -1;
        }

        // Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
        public lastIndexOf(e:E) {
            for (var i = this._elements.length - 1; i >= 0; i--)
                if (this._elements[i] === e)
                    return i;
            return -1;
        }

        // Appends all of the elements in the specified collection to the end of this list.
        public appendAll(l:List<E>) {
            for (var i = 0; i < l.size(); i++)
                this.append(l.get(i));
        }

        public addAll(index:number, l:List<E>) {
            if (index < 0 || index >= this.size())
                throw new Error("Index out of bounds");

            for (var i = 0; i < l.size(); i++)
                this.add(index + i, l.get(i));
        }

        // Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive. (If fromIndex and toIndex are equal, the returned list is empty.) The returned list is backed by this list, so non-structural changes in the returned list are reflected in this list, and vice-versa.
        public subList(fromIndex:number, toIndex:number):List<E> {
            if (fromIndex < 0 || toIndex > this.size() || fromIndex > toIndex)
                throw new Error("Index out of bounds");

            var rl = new List<E>();
            for (var i = fromIndex; i < toIndex; i++)
                rl.append(this._elements[i]);
            return rl;
        }

        public contains(e:E):boolean {
            for (var i = 0; i < this._elements.length; i++)
                if (this._elements[i] == e)
                    return true;
            return false;
        }

        public forEach(callbackfn:(value:E, index:number, list:List<E>) => void, thisArg?:any):void {
            var that = this;
            for (var i = 0; i < this._elements.length; i++)
                callbackfn.call(this, that._elements[i], i);
        }

        public iterator():i.collections.Iterator<E> {
            var that = this;
            return {
                cursor: 0,
                hasNext():boolean {
                    return this.cursor != that.size();
                },
                next():E {
                    if (this.cursor >= that.size())
                        throw new Error('No next element');
                    this.cursor++;
                    return that.get(this.cursor - 1);
                },
                remove() {
                    that.remove(that._elements[this.cursor]);
                }
            }
        }
    }
}

