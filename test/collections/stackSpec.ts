/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {collections as coll} from '../../src/collections/stack';

describe('Test List', ()=> {
    let stack = null;

    beforeEach(()=> {
        stack = new coll.Stack<number>();
    });

    afterEach(()=> {
        stack = null;
    });

    it('should be created', ()=> {
        expect(stack).not.toBeNull();
    });

    it('should be empty when created', ()=> {
        expect(stack.empty()).toBe(true);
        expect(stack.size()).toEqual(0);
    });

    it('should return null when stack is empty', ()=> {
        expect(stack.top()).toBeNull();
    });

    it('should return top - last element entered when pushed', ()=> {
        stack.push(7);
        stack.push(5);
        expect(stack.top()).toEqual(5);
    });

    it('should return null when popped & stack is empty', ()=> {
        expect(stack.pop()).toBeNull();
    });

    it('should return top and remove last element entered when pushed', ()=> {
        stack.push(7);
        stack.push(5);
        expect(stack.pop()).toEqual(5);
        expect(stack.top()).toEqual(7);
        expect(stack.size()).toEqual(1);
    });
});