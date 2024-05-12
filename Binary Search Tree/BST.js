
const main = () => {
    const myTree = new BinarySearchTree();

    const bstUI = new BinarySearchTreeUI(myTree, null, '.tree');
    bstUI.init();
    bstUI.render();

};


class TreeNode {
    constructor(value) {
        this.value = parseInt(value);
        this.left = null;
        this.right = null;
    }

}
class BinarySearchTree {
    root;

    constructor() {
        this.root = null;

    }

    insert(value) {

        var newNode = new TreeNode(value);


        if (this.root === null)
            this.root = newNode;
        else

            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {

        if (newNode.value < node.value) {

            if (node.left === null) {
                node.left = newNode;
            }
            else

                this.insertNode(node.left, newNode);

        }
        else {

            if (node.right === null)
                node.right = newNode;
            else
                this.insertNode(node.right, newNode);

        }
    }

    remove(value) {

        this.root = this.removeNode(this.root, value);

    }

    removeNode(node, key) {


        if (node === null)
            return null;


        else if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        }


        else if (key > node.value) {

            node.right = this.removeNode(node.right, key);
            return node;
        }


        else {

            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }


            if (node.left === null) {
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }


            var aux = this.findMinNode(node.right);
            node.value = aux.value;

            node.right = this.removeNode(node.right, aux.value);
            return node;
        }

    }
    findMinNode(node) {

        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }


}

const defaultBSTUIConfig = {
    HIGHLIGHT_CLASS: 'node__element--highlight',
    HIGHLIGHT_TIME: 300,
};

class BinarySearchTreeUI {
    highlightTimer = null;
    actionsContainerSelector;
    constructor(
        tree,
        render,
        treeContainerSelector = '.tree',
        actionsContainerSelector = '.bst-actions-container',
        config = {
            HIGHLIGHT_CLASS: 'node__element--highlight',
            HIGHLIGHT_TIME: 300,
        }
    ) {
        this.treeContainerSelector = treeContainerSelector;
        this.actionsContainerSelector = actionsContainerSelector;
        this.config = config;
        this.tree = tree;
        this.render = render || this.renderTree;
        const root = document.documentElement;
        root.style.setProperty(
            '--animation-timing',
            `${this.config.HIGHLIGHT_TIME / 1000}s`
        );
    }

    traverseUINodes(nodes) {
        nodes.reduce((pr, node) => {
            return pr.then(() => this.highlightNode(node));
        }, Promise.resolve());
    }

    getTreeUI(node) {
        const { left, right, value } = node;
        if (!node) {
            return '';
        }
        return `
        <div class="node__element" value-node-id="${value}">${value}</div>
        ${left || right
                ? `
              <div class="node__bottom-line"></div>
              <div class="node__children">
              <div class="node node--left">
                ${left ? this.getTreeUI(left) : ''}
              </div>
              <div class="node node--right">
                ${right ? this.getTreeUI(right) : ''}
              </div>
              </div>
            `
                : ''
            }
      `;
    }

    renderTree(
        node = this.tree.root,
        containerSelector = this.treeContainerSelector
    ) {
        const treeContainer = document.querySelector(containerSelector);
        if (!node) {
            return (treeContainer.innerHTML = '');
        }
        const template = this.getTreeUI(node);

        treeContainer.innerHTML = template;
    }

    highlightNode(value) {

        const nodeElement = document.querySelector(`[value-node-id="${value}"]`);
        if (!nodeElement) {
            console.error(`Node element with value-node-id="${value}" not found.`);
            return;
        }

        if (this.highlightTimer !== null) {
            clearTimeout(this.highlightTimer);
            nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
            this.highlightTimer = null;
            return;
        }

        nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);
        document.querySelectorAll('button').forEach((btn) => {
            btn.setAttribute('disabled', true);
        });

        return new Promise((resolve) => {
            this.highlightTimer = setTimeout(() => {
                nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
                document.querySelectorAll('button').forEach((btn) => {
                    btn.removeAttribute('disabled');
                });
                this.highlightTimer = null;
                resolve();
            }, this.config.HIGHLIGHT_TIME);
        });
    }

    onInsertBtnClick() {
        const element = prompt('Enter element to add to tree');
        if (!element) {
            return;
        }
        const value = this.tree.insert(element);
        this.render(this.tree.root);
        this.highlightNode(element);
    }
    onRemoveElementBtnClick() {
        const element = prompt('Enter element to remove from the tree');
        const removeEl = parseInt(element);
        this.tree.remove(removeEl);
        if (element != -1) {
            this.highlightNode(removeEl).then(() => {
                this.render(this.tree.root);
            });
        } else {
            alert('Element not found');
        }
    }

    setTemplate() {
        const actionsContainer = document.querySelector(
            this.actionsContainerSelector
        );
        actionsContainer.innerHTML = this.template();
    }



    init() {

        const insert = document.querySelector('#insertBtn');
        const removeElementBtn = document.querySelector('#removeElementBtn');

        removeElementBtn.addEventListener(
            'click',
            this.onRemoveElementBtnClick.bind(this)
        );
        insert.addEventListener('click', this.onInsertBtnClick.bind(this));

    }

}




main();

