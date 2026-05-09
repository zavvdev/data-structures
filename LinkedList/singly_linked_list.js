var { it, assert } = require("../test_utils");

/**
* Singly Linked List
* 
* It is a collection of nodes where each node contains a data field
* and a reference (link) to the next node in the sequence.
* The last node in the list points to null, indicating the end of the list.
*
* Operations:
*   1. Traversal (visiting each node in the linked list and performing some operation on the data)
*   2. Searching
*   3. Length
*   4. Insertion:
*     - Insert at the beginning
*     - Insert at the end
*     - Insert at a specific position
*   5. Deletion:
*     - Delete from the beginning
*     - Delete from the end
*     - Delete a specific node
*/

var Node = function(value, next) {
  this.value = value;
  this.next = next;
};

var SinglyLinkedList = function() {
  this.head = null;
  this.length = 0;
};

SinglyLinkedList.prototype.traverse = function(fn) {
  if (this.head === null) {
    return;
  }

  var current = this.head;

  while (current !== null) {
    fn(current);
    current = current.next;
  }
};

SinglyLinkedList.prototype.is_present = function(value) {
  var current = this.head;

  while (current !== null) {
    if (current.value === value) {
      return true;
    }
    current = current.next;
  }

  return false;
};

SinglyLinkedList.prototype.find = function(value) {
  if (this.head === null) {
    return -1;
  }

  var index = 0;
  var current = this.head;

  while (current !== null) {
    if (current.value === value) {
      return index;
    }
    index++;
    current = current.next;
  }

  return -1;
};

SinglyLinkedList.prototype.insert_front = function(value) {
  var node = new Node(value, this.head);
  this.head = node;
  this.length++;
};

SinglyLinkedList.prototype.insert_back = function(value) {
  var node = new Node(value, null);

  if (this.head === null) {
    this.head = node;
    this.length++;
    return;
  }

  var last_node = this.head;

  while (last_node.next !== null) {
    last_node = last_node.next;
  }

  last_node.next = node;
  this.length++;
};

SinglyLinkedList.prototype.insert_at = function(value, index) {
  var node = new Node(value, null);

  if (index === 0) {
    node.next = this.head;
    this.head = node;
    this.length++;
    return;
  }

  if (index < 0) {
    index = this.length + index + 1;
  }

  if (index > this.length) {
    index = this.length;
  }

  var current = this.head;

  for (let i = 1; i < index && current.next !== null; i++) {
    current = current.next;
  }

  node.next = current.next;
  current.next = node;
};

SinglyLinkedList.prototype.delete_front = function() {
  if (this.head === null) {
    return;
  }

  if (this.head.next === null) {
    this.head = null;
    this.length = 0;
    return;
  }

  this.head = this.head.next;
  this.length--;
};

SinglyLinkedList.prototype.delete_back = function() {
  if (this.head === null) {
    return;
  }

  if (this.head.next === null) {
    this.head = null;
    this.length = 0;
    return;
  }

  var current = this.head;

  while (current.next !== null && current.next.next !== null) {
    current = current.next;
  }

  current.next = null;
  this.length--;
};

SinglyLinkedList.prototype.delete_at = function(index) {
  if (this.head === null) {
    return;
  }

  if (index === 0) {
    this.head = this.head.next;
    this.length--;
    return;
  }

  if (index < 0) {
    index = this.length + index;
  }

  var current = this.head;

  for (let i = 1; i < index && current.next !== null; i++) {
    current = current.next;
  }

  if (current.next === null) {
    return;
  }

  current.next = current.next.next;
  this.length--;
};

// ========================
//
// Tests
//
// ========================

it("should have length", () => {
  var sll = new SinglyLinkedList();
  assert(sll.length === 0);

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_front(3);
  assert(sll.length === 3);

  sll.insert_front(4);
  assert(sll.length === 4);

  sll.delete_front();
  assert(sll.length === 3);

  sll.delete_front();
  sll.delete_front();
  sll.delete_front();
  sll.delete_front();
  sll.delete_front();
  assert(sll.length === 0);
});

it("should traverse", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_front(3);

  var values = [];
  sll.traverse((node) => values.push(node.value));

  assert(values[0] === 3);
  assert(values[1] === 2);
  assert(values[2] === 1);
});

it("should return true if present", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  assert(sll.is_present(1) === true);
});

it("should return false if not present", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(2);
  assert(sll.is_present(1) === false);
});

it("should return an index if found", () => {
  var sll = new SinglyLinkedList();
  sll.insert_back(2);
  sll.insert_back(3);
  sll.insert_back(4);
  sll.insert_back(5);
  assert(sll.find(4) === 2);
});

it("should return -1 if empty", () => {
  var sll = new SinglyLinkedList();
  assert(sll.find(4) === -1);
});

it("should return -1 if not found", () => {
  var sll = new SinglyLinkedList();
  sll.insert_back(3);
  assert(sll.find(4) === -1);
});

it("should insert at the beginning", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);

  assert(sll.head.value === 2);
  assert(sll.head.next.value === 1);
  assert(sll.length === 2);
});

it("should insert at the end", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_back(3);

  assert(sll.head.value === 2);
  assert(sll.head.next.value === 1);
  assert(sll.head.next.next.value === 3);
});

it("should insert at custom position", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_back(3);
  sll.insert_at(4, 1);

  assert(sll.head.value === 2);
  assert(sll.head.next.value === 4);
  assert(sll.head.next.next.value === 1);
  assert(sll.head.next.next.next.value === 3);
});

it("should insert at 0 position if empty", () => {
  var sll = new SinglyLinkedList();
  sll.insert_at(1, 0);

  assert(sll.head.value === 1);
});

it("should insert at 0 position", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_at(2, 0);

  assert(sll.head.value === 2);
  assert(sll.head.next.value === 1);
});

it("should insert at the end if index is greater that length", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_at(2, 10);

  assert(sll.head.value === 1);
  assert(sll.head.next.value === 2);
});


it("should custom insert at the end", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_at(2, 1);

  assert(sll.head.value === 1);
  assert(sll.head.next.value === 2);
});

it("should insert with negative index", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_front(3);
  sll.insert_front(4);
  sll.insert_at(0, -2);

  assert(sll.head.value === 4);
  assert(sll.head.next.value === 3);
  assert(sll.head.next.next.value === 2);
  assert(sll.head.next.next.next.value === 0);
  assert(sll.head.next.next.next.next.value === 1);
});

it("should delete from beginning", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.delete_front();

  assert(sll.head.value === 1);
});

it("should delete from the beggining if length = 1", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.delete_front();

  assert(sll.head === null);
});

it("should delete from the end", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.delete_back();

  assert(sll.head.value === 2);
});

it("should delete from the end if length = 1", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.delete_back();

  assert(sll.head === null);
});

it("should delete at custom position", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_front(3);
  sll.delete_at(1);

  assert(sll.head.value === 3);
  assert(sll.head.next.value === 1);
});

it("should not delete if out of bounds", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.delete_at(10);

  assert(sll.head.value === 1);
});

it("should delete with negative index", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_front(3);
  sll.insert_front(4);
  sll.delete_at(-2);

  assert(sll.head.value === 4);
  assert(sll.head.next.value === 3);
  assert(sll.head.next.next.value === 1);
});
