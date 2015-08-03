/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import {collections as coll} from '../../src/collections/deque';

describe('Test Dequeue', function () {
    var deque = null;

    beforeEach(function () {
        deque = new coll.Deque<string>();
    });

    afterEach(function () {
        deque = null;
    });

    it('should be created', function () {
        expect(deque).not.toBeNull();
    });

    it('should be empty when created', function () {
        expect(deque.empty()).toBe(true);
    });

    it('should insert element at back', function () {
        deque.inject("a");
        expect(deque.size()).toEqual(1);
        expect(deque.back()).toEqual("a");
    });

    it('should insert element at front', function () {
        deque.push("a");
        expect(deque.size()).toEqual(1);
        expect(deque.front()).toEqual("a");
    });

    it('should return front and back', function () {
        deque.push("a");
        deque.push("b");
        expect(deque.size()).toEqual(2);
        expect(deque.back()).toEqual("a");
        expect(deque.front()).toEqual("b");
    });

    it('should remove last element', function () {
        deque.push("a");
        deque.push("b");
        expect(deque.eject()).toEqual("a");
        expect(deque.size()).toEqual(1);
    });

    it('should remove first element', function () {
        deque.push("a");
        deque.push("b");
        expect(deque.pop()).toEqual("b");
        expect(deque.size()).toEqual(1);
    });

    it('should throw error when deque is empty', function () {
        expect(function () {deque.back();}).toThrow(new Error("Deque is empty"));
        expect(function () {deque.front();}).toThrow(new Error("Deque is empty"));
        expect(function () {deque.eject();}).toThrow(new Error("Deque is empty"));
        expect(function () {deque.pop();}).toThrow(new Error("Deque is empty"));
    });
});