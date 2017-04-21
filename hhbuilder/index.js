'use strict';

window.onload = onloadHandler;

var household = [],
	errors = [],
	formErrorBox = 
		'<div class="errorBox" style="font-weight: bold; color: #ef0000; display: none">' +
		'<h2>Please correct the following errors:</h2>' +
		'<ul class="errors"></ul>'
		'</div>'
	;

function render(container, items, fn) {
	var newContent = '';
	items.forEach(function(item, index){
		newContent += fn(item, index);
	});
	container.innerHTML = newContent;
}

function elem(query) {
	return document.querySelector(query);
}

function onloadHandler() {
	elem('form').innerHTML += formErrorBox;
	elem('.add').onclick = addButtonClickHandler;
	elem('form').onsubmit = formSubmitHandler;
}

function formSubmitHandler(e) {
	e.preventDefault();
	elem('.debug').innerHTML = JSON.stringify(household);
	elem('.debug').style.display = 'block';
}

function addButtonClickHandler(e) {
	e.preventDefault();
	errors = [];
	var 
		formElems = elem('form').elements,
		person = {
			age: formElems['age'].value,
			rel: formElems['rel'].value,
			smoker: formElems['smoker'].checked
		};
	if (parseInt(person.age) != person.age) {
		errors.push('Age - must be a number greater than 0');
	}
	if (!person.rel.length) {
		errors.push('Relationship - this field is required');
	}
	if (errors.length) {
		elem('.errorBox').style.display = 'block';
		return render(elem('.errors'), errors, renderError);
	}
	elem('.errorBox').style.display = 'none';
	elem('form').reset();
	household.push(person);
	render(elem('.household'), household, renderHousehold);
}

function removePerson(index) {
	household.splice(index, 1);
	render(elem('.household'), household, renderHousehold);
}

function renderHousehold(person, index) {
	var 
		attribs = [person.rel, person.age, (person.smoker ? 'Smoker' : 'Non-Smoker')].join(', '),
		output = '<li>' + attribs + '<button onclick="removePerson(' + index + ')">Remove</button></li>';
	return output;
}

function renderError(error) {
	return '<li>' + error + '</li>';
}