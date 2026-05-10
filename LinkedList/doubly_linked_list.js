var { it, assert, assert_throw } = require("../test_utils");

/**
 * Doubly Linked List
 *
 * A doubly linked list is a more complex data structure than a singly linked list,
 * but it offers several advantages. The main advantage is that it allows for efficient
 * traversal of the list in both directions. This is because each node in the list contains
 * a pointer to the previous node and a pointer to the next node. This allows for quick
 * and easy insertion and deletion of nodes from the list, as well as efficient traversal
 * of the list in both directions.
 *
 * Operations:
 *   1. Access/search
 *     - Get by index
 *     - Find by value
 *   2. Traversal
 *     - From the start
 *     - From the end
 *   3. Insertion:
 *     - Insert at the beginning
 *     - Insert at the end
 *     - Insert at the specific position
 *   4. Deletion:
 *     - Delete from the beginning
 *     - Delete from the end
 *     - Delete at the specific position
 *   5. Utility
 *     - Get length
 *     - Clear
 *     - Reverse
 */

function Node(value, prev, next) {
  this.value = value;
  this.prev = prev;
  this.next = next;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

DoublyLinkedList.prototype.get_at = function (index) {
  if (typeof index !== "number") {
    throw new Error(`Expected 'index' to be a number, got ${typeof index}`);
  }

  if (this.length === 0 || index >= this.length) {
    return null;
  }

  if (index < 0) {
    index = this.length + index;
  }

  var mid = (this.length / 2) | 0;
  var current_node = null;

  if (index <= mid) {
    current_node = this.head;
    for (let i = 0; i <= mid && current_node.next !== null; i++) {
      if (index === i) {
        return current_node;
      }
      current_node = current_node.next;
    }
  } else {
    current_node = this.tail;
    for (let i = this.length - 1; i >= mid && current_node.prev !== null; i--) {
      if (index === i) {
        return current_node;
      }
      current_node = current_node.prev;
    }
  }

  return null;
};

DoublyLinkedList.prototype.find = function (value) {
  if (this.head === null) {
    return -1;
  }

  var current_node = this.head;

  for (let i = 0; i <= this.length - 1 && current_node.next !== null; i++) {
    if (current_node.value === value) {
      return i;
    }
    current_node = current_node.next;
  }

  return -1;
};

DoublyLinkedList.prototype.traverse = function (fn) {
  if (typeof fn !== "function") {
    throw new Error(`Expected 'fn' to be a function, got ${typeof fn}`);
  }

  if (this.head === null) {
    return;
  }

  var current_node = this.head;

  while (current_node !== null) {
    fn(current_node);
    current_node = current_node.next;
  }
};

DoublyLinkedList.prototype.traverse_back = function (fn) {
  if (typeof fn !== "function") {
    throw new Error(`Expected 'fn' to be a function, got ${typeof fn}`);
  }

  if (this.tail === null) {
    return;
  }

  var current_node = this.tail;

  while (current_node !== null) {
    fn(current_node);
    current_node = current_node.prev;
  }
};

DoublyLinkedList.prototype.insert = function (value) {
  var node = new Node(value, null, this.head);
  if (this.head !== null) {
    this.head.prev = node;
  }
  if (this.tail === null) {
    this.tail = node;
  }
  this.head = node;
  this.length++;
};

DoublyLinkedList.prototype.insert_back = function (value) {
  var tail = this.tail;
  var node = new Node(value, tail, null);
  if (tail !== null) {
    tail.next = node;
  }
  if (this.head === null) {
    this.head = node;
  }
  this.tail = node;
  this.length++;
};

DoublyLinkedList.prototype.insert_at = function (value, index) {
  if (typeof index !== "number") {
    throw new Error(`Expected 'index' to be a number, got ${typeof index}`);
  }
  if (index < 0) {
    index = this.length + index;
  }
  if (this.head === null && index === 0) {
    this.insert(value);
    return;
  }
  if (index >= this.length) {
    throw new Error("Out of bounds");
  }

  var mid = (this.length / 2) | 0;
  var current_node = null;

  var insert_instead = (current_node) => {
    const node = new Node(value, current_node.prev, current_node);
    current_node.prev.next = node;
    current_node.prev = node;
    this.length++;
  };

  if (index <= mid) {
    current_node = this.head;
    for (let i = 0; i <= this.length - 1; i++) {
      if (i === index) {
        insert_instead(current_node);
        return;
      }
      current_node = current_node.next;
    }
  } else {
    current_node = this.tail;
    for (let i = this.length - 1; i >= mid; i--) {
      if (i === index) {
        insert_instead(current_node);
        return;
      }
      current_node = current_node.prev;
    }
  }

  throw new Error("Not found");
};

// ========================
//
// Tests
//
// ========================

it("get_at should throw if index is not a number", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  assert_throw(() => dll.get_at());
  assert_throw(() => dll.get_at("1"));
  assert_throw(() => dll.get_at(false));
});

it("get_at should get node at the middle index", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  assert(dll.get_at(1).value === 2);
});

it("get_at should get node at the start index", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  assert(dll.get_at(0).value === 3);
});

it("get_at should get node at the end index", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  assert(dll.get_at(2).value === 1);
});

it("get_at should return null if our of bounds", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  assert(dll.get_at(-2) === null);
  assert(dll.get_at(-20) === null);
});

it("get_at should return null if length is 0", () => {
  var dll = new DoublyLinkedList();
  assert(dll.get_at(2) === null);
});

it("get_at sould return by accessing negative index", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  dll.insert(4);
  assert(dll.get_at(-2).value === 2);
});

it("get_at should return a correct result by searching from the start", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  dll.insert(4);
  dll.insert(5);
  dll.insert(6);
  assert(dll.get_at(1).value === 5);
});

it("get_at should return a correct result by searching from the end", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  dll.insert(4);
  dll.insert(5);
  dll.insert(6);
  assert(dll.get_at(4).value === 2);
});

it("find should return -1 if list is empty", () => {
  var dll = new DoublyLinkedList();
  assert(dll.find(4) === -1);
});

it("find should return -1 if not found", () => {
  var dll = new DoublyLinkedList();
  dll.insert(6);
  assert(dll.find(4) === -1);
});

it("find should return an index of the found node", () => {
  var dll = new DoublyLinkedList();
  dll.insert(6);
  dll.insert(2);
  dll.insert(1);
  assert(dll.find(2) === 1);
});

it("traverse should throw if fn is not a function", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  assert_throw(() => dll.traverse());
});

it("traverse should call a function on each node from the start", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  var arr = [];
  dll.traverse((node) => arr.push(node.value));
  assert(arr.toString() === "3,2,1");
});

it("traverse_back should throw if fn is not a function", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  assert_throw(() => dll.traverse_back());
});

it("traverse_back should call a function on each node from the end", () => {
  var dll = new DoublyLinkedList();
  dll.insert(1);
  dll.insert(2);
  dll.insert(3);
  var arr = [];
  dll.traverse_back((node) => arr.push(node.value));
  assert(arr.toString() === "1,2,3");
});

it("insert should insert items from the start", () => {
  var dll = new DoublyLinkedList();
  assert(dll.head === null);
  assert(dll.tail === null);

  dll.insert(1);
  assert(dll.head.value === 1);
  assert(dll.head.next === null);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 1);
  assert(dll.tail.next === null);
  assert(dll.tail.prev === null);

  dll.insert(2);
  assert(dll.head.value === 2);
  assert(dll.head.next.value === 1);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 1);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 2);

  dll.insert(3);
  assert(dll.head.value === 3);
  assert(dll.head.next.value === 2);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 1);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 2);

  dll.insert(4);
  assert(dll.head.value === 4);
  assert(dll.head.next.value === 3);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 1);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 2);

  assert(dll.get_at(0).value === 4);
  assert(dll.get_at(1).value === 3);
  assert(dll.get_at(2).value === 2);
  assert(dll.get_at(3).value === 1);
});

it("insert_back should insert items from the end", () => {
  var dll = new DoublyLinkedList();
  assert(dll.head === null);
  assert(dll.tail === null);

  dll.insert_back(1);
  assert(dll.head.value === 1);
  assert(dll.head.next === null);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 1);
  assert(dll.tail.next === null);
  assert(dll.tail.prev === null);

  dll.insert_back(2);
  assert(dll.head.value === 1);
  assert(dll.head.next.value === 2);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 2);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 1);

  dll.insert_back(3);
  assert(dll.head.value === 1);
  assert(dll.head.next.value === 2);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 3);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 2);

  dll.insert_back(4);
  assert(dll.head.value === 1);
  assert(dll.head.next.value === 2);
  assert(dll.head.prev === null);
  assert(dll.tail.value === 4);
  assert(dll.tail.next === null);
  assert(dll.tail.prev.value === 3);

  assert(dll.get_at(0).value === 1);
  assert(dll.get_at(1).value === 2);
  assert(dll.get_at(2).value === 3);
  assert(dll.get_at(3).value === 4);
});

it("insert_at should throw if index is not a number", () => {
  var dll = new DoublyLinkedList();
  assert_throw(() => dll.insert_at(1, "123"));
  assert_throw(() => dll.insert_at(1, false));
  assert_throw(() => dll.insert_at(1, []));
  assert_throw(() => dll.insert_at(1));
});

it("insert_at should throw if index is out of bounds", () => {
  var dll = new DoublyLinkedList();
  assert_throw(() => dll.insert_at(1, 100));
  assert_throw(() => dll.insert_at(1, -100));
});

it("insert_at should insert at the beginning by index", () => {
  var dll = new DoublyLinkedList();
  dll.insert_at(1, 0);
  assert(dll.length === 1);
  assert(dll.head.value === 1);
  assert(dll.tail.value === 1);
});

it("insert_at should insert starting search from the beginning", () => {
  var dll = new DoublyLinkedList();
  dll.insert_back(1);
  dll.insert_back(2);
  dll.insert_back(3);
  dll.insert_back(4);

  dll.insert_at(0, 1);

  assert(dll.get_at(0).value === 1);
  assert(dll.get_at(1).value === 0);
  assert(dll.get_at(2).value === 2);
  assert(dll.get_at(3).value === 3);
  assert(dll.get_at(4).value === 4);
  assert(dll.length === 5);

  assert(dll.get_at(0).prev === null);
  assert(dll.get_at(0).next.value === 0);

  assert(dll.get_at(1).prev.value === 1);
  assert(dll.get_at(1).next.value === 2);

  assert(dll.get_at(2).prev.value === 0);
  assert(dll.get_at(2).next.value === 3);

  assert(dll.get_at(3).prev.value === 2);
  assert(dll.get_at(3).next.value === 4);

  assert(dll.get_at(4).prev.value === 3);
  assert(dll.get_at(4).next === null);
});

it("insert_at should insert starting search from the end", () => {
  var dll = new DoublyLinkedList();
  dll.insert_back(1);
  dll.insert_back(2);
  dll.insert_back(3);
  dll.insert_back(4);
  dll.insert_back(5);

  dll.insert_at(0, 3);

  assert(dll.get_at(0).value === 1);
  assert(dll.get_at(1).value === 2);
  assert(dll.get_at(2).value === 3);
  assert(dll.get_at(3).value === 0);
  assert(dll.get_at(4).value === 4);
  assert(dll.get_at(5).value === 5);
  assert(dll.length === 6);

  assert(dll.get_at(0).prev === null);
  assert(dll.get_at(0).next.value === 2);

  assert(dll.get_at(1).prev.value === 1);
  assert(dll.get_at(1).next.value === 3);

  assert(dll.get_at(2).prev.value === 2);
  assert(dll.get_at(2).next.value === 0);

  assert(dll.get_at(3).prev.value === 3);
  assert(dll.get_at(3).next.value === 4);

  assert(dll.get_at(4).prev.value === 0);
  assert(dll.get_at(4).next.value === 5);

  assert(dll.get_at(5).prev.value === 4);
  assert(dll.get_at(5).next === null);
});

it("insert_at should support negative index insertion", () => {
  var dll = new DoublyLinkedList();
  dll.insert_back(1);
  dll.insert_back(2);
  dll.insert_at(0, -1);
  var list = [];
  dll.traverse((node) => list.push(node.value));
  assert(list.toString() === "1,0,2");
});
