/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {collections as coll} from '../../src/collections/queue';

describe('Test Queue', ()=> {
    let queue = null;

    beforeEach(()=> {
        queue = new coll.Queue<string>();
    });

    afterEach(()=> {
        queue = null;
    });

    it('should be created', ()=> {
        expect(queue).not.toBeNull();
    });

    it('should be empty when created', ()=> {
        expect(queue.empty()).toBe(true);
    });

    it('should not be empty when one element is added', ()=> {
        queue.enqueue("k");
        expect(queue.empty()).toBe(false);
    });

    it('should have 0-size when created', ()=> {
        expect(queue.size()).toEqual(0);
    });

    it('should increase size when elements are added', ()=> {
        queue.enqueue("a");
        expect(queue.size()).toEqual(1);
        queue.enqueue("b");
        expect(queue.size()).toEqual(2);
    });

    it('should not be empty when one element is added', ()=> {
        queue.enqueue("a");
        queue.enqueue("b");
        expect(queue.size()).toEqual(2);
        expect(queue.dequeue()).toEqual("a");
        expect(queue.dequeue()).toEqual("b");
        expect(queue.empty()).toBe(true);
    });


    it('should return the head without dequeuing', ()=> {
        expect(()=> {
            queue.head();
        }).toThrow(new Error("Queue is empty"));

        queue.enqueue("a");
        expect(queue.head()).toEqual("a");
        expect(queue.size()).toEqual(1);
    });
});