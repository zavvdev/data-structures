var { it, assert } = require("../../test_utils");

var Node = function (value, next) {
  this.value = value;
  this.next = next;
};

var SinglyLinkedList = function () {
  this.head = null;
};

SinglyLinkedList.prototype.traverse = function (fn) {
  if (this.head === null) {
    return;
  }

  var current = this.head;

  while (current !== null) {
    fn(current);
    current = current.next;
  }
};

SinglyLinkedList.prototype.is_present = function (value) {
  var current = this.head;

  while (current !== null) {
    if (current.value === value) {
      return true;
    }
    current = current.next;
  }

  return false;
};

SinglyLinkedList.prototype.length = function () {
  var count = 0;
  this.traverse(() => count++);

  return count;
};

SinglyLinkedList.prototype.insert_front = function (value) {
  var node = new Node(value, this.head);
  this.head = node;
};

SinglyLinkedList.prototype.insert_back = function (value) {
  var node = new Node(value, null);

  if (this.head === null) {
    this.head = node;
    return;
  }

  var last_node = this.head;

  while (last_node.next !== null) {
    last_node = last_node.next;
  }

  last_node.next = node;
};

SinglyLinkedList.prototype.insert_at = function (value, index) {
  var node = new Node(value, null);

  if (index === 0 || this.head === null) {
    this.head = node;
    return;
  }

  var current = this.head;

  for (let i = 1; i < index && current.next !== null; i++) {
    current = current.next;
  }

  node.next = current.next;
  current.next = node;
};

SinglyLinkedList.prototype.delete_front = function () {
  if (this.head === null) {
    console.log("List is empty");
    return;
  }

  if (this.head.next === null) {
    this.head = null;
    return;
  }

  this.head = this.head.next;
};

SinglyLinkedList.prototype.delete_back = function () {
  if (this.head === null) {
    console.log("List is empty");
    return;
  }

  if (this.head.next === null) {
    this.head = null;
    return;
  }

  var current = this.head;

  while (current.next !== null && current.next.next !== null) {
    current = current.next;
  }

  current.next = null;
};

SinglyLinkedList.prototype.delete_at = function (index) {
  if (this.head === null) {
    console.log("List is empty");
    return;
  }

  if (index === 0) {
    this.head = this.head.next;
    return;
  }

  var current = this.head;

  for (let i = 1; i < index && current.next !== null; i++) {
    current = current.next;
  }

  if (current.next === null) {
    console.log("Index out of bounds");
    return;
  }

  current.next = current.next.next;
};

// Tests

it("should insert at front", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);

  assert(sll.head.value === 2);
  assert(sll.head.next.value === 1);
});

it("should insert at back", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_back(3);

  assert(sll.head.next.value === 1);
  assert(sll.head.next.next.value === 3);
});

it("should insert at custom position", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_back(3);
  sll.insert_at(4, 1);

  assert(sll.head.next.value === 4);
});

it("should delete from front", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.delete_front();

  assert(sll.head.value === 1);
});

it("should delete from back", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.delete_back();

  assert(sll.head.value === 2);
});

it("should delete at custom position", () => {
  var sll = new SinglyLinkedList();

  sll.insert_front(1);
  sll.insert_front(2);
  sll.insert_back(3);
  sll.delete_at(1);

  assert(sll.head.next.value === 3);
});

it("should have length 0", () => {
  var sll = new SinglyLinkedList();
  assert(sll.length() === 0);
});

it("should have length 1", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  assert(sll.length() === 1);
});

it("should return true if present", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  assert(sll.is_present(1) === true);
});

it("should return false if not present", () => {
  var sll = new SinglyLinkedList();
  assert(sll.is_present(1) === false);
});

it("should traverse", () => {
  var sll = new SinglyLinkedList();
  sll.insert_front(1);
  sll.insert_front(2);

  var values = [];
  sll.traverse((node) => values.push(node.value));

  assert(values[0] === 2);
  assert(values[1] === 1);
});
