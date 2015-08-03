export module collections {
    export class Queue<E> {
        private _elements:Array<E> = [];

        public size():number {
            return this._elements.length;
        }

        public empty():boolean {
            return this._elements.length == 0;
        }

        public enqueue(e:E) {
            this._elements.push(e);
        }

        public dequeue():E {
            return this._elements.shift();
        }

        public head():E {
            if (this.empty()) throw new Error('Queue is empty');
            return this._elements[this.size() - 1];
        }
    }
}
