/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {collections as coll} from '../../src/collections/deque';

describe('Test Dequeue', ()=> {
    let deque = null;

    beforeEach(()=> {
        deque = new coll.Deque<string>();
    });

    afterEach(()=> {
        deque = null;
    });

    it('should be created', ()=> {
        expect(deque).not.toBeNull();
    });

    it('should be empty when created', ()=> {
        expect(deque.empty()).toBe(true);
    });

    it('should insert element at back', ()=> {
        deque.inject("a");
        expect(deque.size()).toEqual(1);
        expect(deque.back()).toEqual("a");
    });

    it('should insert element at front', ()=> {
        deque.push("a");
        expect(deque.size()).toEqual(1);
        expect(deque.front()).toEqual("a");
    });

    it('should return front and back', ()=> {
        deque.push("a");
        deque.push("b");
        expect(deque.size()).toEqual(2);
        expect(deque.back()).toEqual("a");
        expect(deque.front()).toEqual("b");
    });

    it('should remove last element', ()=> {
        deque.push("a");
        deque.push("b");
        expect(deque.eject()).toEqual("a");
        expect(deque.size()).toEqual(1);
    });

    it('should remove first element', ()=> {
        deque.push("a");
        deque.push("b");
        expect(deque.pop()).toEqual("b");
        expect(deque.size()).toEqual(1);
    });

    it('should throw error when deque is empty', ()=> {
        expect(()=> {
            deque.back();
        }).toThrow(new Error("Deque is empty"));
        expect(()=> {
            deque.front();
        }).toThrow(new Error("Deque is empty"));
        expect(()=> {
            deque.eject();
        }).toThrow(new Error("Deque is empty"));
        expect(()=> {
            deque.pop();
        }).toThrow(new Error("Deque is empty"));
    });
});