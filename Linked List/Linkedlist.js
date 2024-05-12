
const main = () => {
    const linkedList = new LinkedList();

    initiateHandlers(linkedList, renderLinkedList);
    renderLinkedList(linkedList);
};
const renderLinkedList = (linkedList) => {
    const boxElement = document.querySelector('.box');
    boxElement.querySelectorAll('.box_item').forEach((item) => item.remove());
    let current = linkedList.head;
    if (linkedList.head === null) {
        return;
    }
    for (let i = 0; i < linkedList.size() && current !== null; i++) {
        const itemElement = document.createElement('DIV');
        itemElement.classList.add('box_item');
        itemElement.classList.add('icon', 'icon-arrow-right');
        itemElement.textContent = current.element;
        boxElement.append(itemElement);
        current = current.next;
    }
};

const defaultEqFn = (a, b) => a === b;

class Node {
    constructor(element, next = null) {
        this.element = element;
        this.next = next;
    }
}

class LinkedList {
    constructor(equalsFn = defaultEqFn) {
        this.head = null;
        this.count = 0;
        this.equalsFn = equalsFn;
    }

    push(element) {
        let current;
        const node = new Node(element);
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
        return node;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) {
            return undefined;
        }

        let current = this.head;
        if (index === 0) {
            this.head = current.next;
        } else {
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }

        this.count--;
        return current;
    }

    getElementAt(index) {
        if (index < 0 || index > this.size()) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < index && current !== null; i++) {
            current = current.next;
        }
        return current;
    }

    insertAt(element, index) {
        if (index < 0 || index > this.size()) {
            return undefined;
        }

        const node = new Node(element);
        if (index === 0) {
            const current = this.head;
            node.next = current;
            this.head = node;
        } else {
            const previous = this.getElementAt(index - 1);
            const current = previous.next;
            node.next = current;
            previous.next = node;
        }

        this.count++;
        return node;
    }

    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.size() && current !== null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    clear() {
        this.head = null;
        this.count = 0;
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    getHead() {
        return this.head;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const linkedListArr = [];
        let current = this.head;
        for (let i = 0; i < this.size() && current !== null; i++) {
            linkedListArr.push(current.element);
            current = current.next;
        }

        return linkedListArr.join(', ');
    }
}

const initiateHandlers = (linkedList, renderLinkedList) => {
    const pushBtn = document.querySelector('#pushBtn');
    const insertAtBtn = document.querySelector('#insertAtBtn');
    const removeElementBtn = document.querySelector('#removeElementBtn');
    const getElementAtBtn = document.querySelector('#getElementAtBtn');
    const indexOfBtn = document.querySelector('#indexOfBtn');
    const removeElementAtBtn = document.querySelector('#removeElementAtBtn');
    const toStringBtn = document.querySelector('#toStringBtn');
    const sizeBtn = document.querySelector('#sizeBtn');
    const isEmptyBtn = document.querySelector('#isEmptyBtn');
    const clearBtn = document.querySelector('#clearBtn');
    pushBtn.addEventListener('click', () => {
        const element = prompt('Enter element to add to linkedlist');
        linkedList.push(element);
        renderLinkedList(linkedList);
    });
    removeElementBtn.addEventListener('click', () => {
        const element = prompt('Enter element to remove from linkedlist');
        const removedEl = linkedList.remove(element);
        if (removedEl) {
            alert('Element removed');
            renderLinkedList(linkedList);
        } else {
            alert('Element not found');
        }
    });
    insertAtBtn.addEventListener('click', () => {
        const element = prompt('Enter element to add to linkedlist');
        const index = prompt('Enter the index the element is to be added at');
        linkedList.insertAt(element, Number(index));
        renderLinkedList(linkedList);
    });
    getElementAtBtn.addEventListener('click', () => {
        const index = prompt('Enter the index the element is to be retrieved from');
        const node = linkedList.getElementAt(Number(index));
        if (node) {
            alert(`Element retrieved = ${node.element}`);
        } else {
            alert('Element not found');
        }
    });
    removeElementAtBtn.addEventListener('click', () => {
        const index = prompt('Enter the index the element is to be removed from');
        const removedEl = linkedList.removeAt(Number(index));
        if (removedEl) {
            alert('Element removed');
            renderLinkedList(linkedList);
        } else {
            alert('Element not found');
        }
    });
    indexOfBtn.addEventListener('click', () => {
        const element = prompt('Enter element you want to find index of');
        const index = linkedList.indexOf(element);
        if (index >= 0) {
            alert(`Index of element '${element}' is ${index}`);
        } else {
            alert('Element not found');
        }
    });
    toStringBtn.addEventListener('click', () => {
        alert(linkedList.toString());
    });
    sizeBtn.addEventListener('click', () => {
        alert(`The size of the linked list is ${linkedList.size()}`);
    });
    isEmptyBtn.addEventListener('click', () => {
        alert(`Linked list is${linkedList.isEmpty() ? '' : ' not'} empty`);
    });
    clearBtn.addEventListener('click', () => {
        linkedList.clear();
        alert('Linked list cleared');
        renderLinkedList(linkedList);
    });
};


main();