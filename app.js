window.onload = console.log('App has started');

var addType = document.querySelector('.add__type');
var addDescription = document.querySelector('.add__description');
var addValue = document.querySelector('.add__value');
var addBtn = document.querySelector('.add__btn');
var post = document.querySelector('.income__list');
var posts = document.querySelector('.expenses__list');
var income = document.getElementById('income');
var btn = document.querySelector('.item__delete--btn');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    return readInput();
})

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === 13) {
        console.log('The enter key was pressed');
        return readInput();
    } else {
        console.log('Another key was pressed');
    }
})

var readInput = () => {
    if (addDescription.value === '') {
        return
    } else {
        console.log('It\'s not empty');
        acceptData();
    }
    
    
    if (addType.value === 'inc') {
        console.log('inc');
    } else if (addType === 'exp') {
        console.log('exp');
        acceptData();
    }
    

    if (addValue.value === '') {
        return
    } else {
        console.log('It\'s not empty');
        acceptData();
    }
};

var allItem = {
    data: {
       inc: [],
       exp: []
    },
   total: {
      exp: 0,
      inc: 0,
      budget: 0,
      percentage: -1
    }
}


var acceptData = () => {
    if (addDescription.value !== '' && addValue.value !== '' && addValue.value > 0) {        
        if (addType.value === 'inc') {
            allItem.data.inc[0] = addDescription.value;
            allItem.data.inc[1] = parseFloat(addValue.value);
        } else if (addType.value === 'exp') {
            allItem.data.exp[0] = addDescription.value;
            allItem.data.exp[1] = parseFloat(addValue.value);
        }
        console.log(allItem);
        return addPost();
    } else if (addDescription.value === '' || addValue.value == 0) {
        addDescription.value = '';
        addValue.value = '';
        addDescription.focus();
    } else if (addValue.value === '' || addValue.value == 0) {
        addValue.value = '';
        addDescription.focus();
    }
}

var addPost = () => {
    if (addType.value === 'inc') {
        post.innerHTML += `
            <div class="income__list">
                <div class="item clearfix" id="income-0">
                    <div class="item__description">${allItem.data.inc[0]}</div>
                    <div class="right clearfix">
                        <div class="item__value">${allItem.data.inc[1]}</div>
                        <div class="item__delete">
                            <button onClick = 'deletePost(this)' class="item__delete--btn">
                                <i class="ion-ios-close-outline"></i>
                            </button>
                        </div>
                    </div>
                </div>        
            </div>
        `;
    } else if (addType.value === 'exp') {
        posts.innerHTML += `
            <div class="expenses__list">
                <div class="item clearfix" id="expense-0">
                    <div class="item__description">${allItem.data.exp[0]}</div>
                    <div class="right clearfix">
                        <div class="item__value">${allItem.data.exp[1]}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                        <button onClick = 'deletePost(this)' class="item__delete--btn">
                        <i class="ion-ios-close-outline"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    addDescription.value = '';
    addValue.value = '';
    addDescription.focus();
    return fill();
}

var sum = 0;
var gum = 0;
var fill = () => {
    if (addType.value === 'inc') {
        sum = sum + allItem.data.inc[1];
        allItem.total.inc = sum;
        console.log('total inc = ' +  allItem.total.inc);
    } else if (addType.value === 'exp') {
        gum += allItem.data.exp[1];
        allItem.total.exp = gum;
        console.log('total exp = ' + allItem.total.exp);
    }
    return calculateBudget();
}

var calculateBudget = () => {
    allItem.total.budget = allItem.total.inc - allItem.total.exp;
    console.log('Total.budget = ' + allItem.total.budget);
    if (allItem.total.inc > 0) {
        allItem.total.percentage = Math.round((allItem.total.exp / allItem.total.inc) * 100);
        console.log('total.percentage = ' + allItem.total.percentage);
    } else{
        allItem.total.percentage = -1;
    }
    return updateBudget();
}

var updateBudget = () => {
    document.querySelector('.budget__value').textContent = 0;
    document.querySelector('.budget__value').textContent = '+' + allItem.total.budget;
    document.querySelector('.budget__income--value').textContent = '+' + allItem.total.inc;
    document.querySelector('.budget__expenses--value').textContent = '-' + allItem.total.exp;
    if (allItem.total.inc > 0) {
        document.querySelector('.budget__expenses--percentage').textContent = allItem.total.percentage + '%';        
    } else {
        document.querySelector('.budget__expenses--percentage').textContent = '---';
    }
}

var deletePost = (e) => {
    e.parentElement.parentElement.parentElement.parentElement.remove();
    return fill();
}
