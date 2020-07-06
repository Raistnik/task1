var rightscore = 0;
var wrongscore = 0;

var questions = [
	{
		"title": "Какой из ответов вы считаете правильным?",
		"answers": ["первый", "второй", "третий"],
		"right": ["первый"],
		"id": '',
		"check": 0
	},
	{
		"title": "Какие из ответов вы не считаете правильными?",
		"answers": ["первый", "второй", "третий"],
		"right": ["второй", "третий"],
		"id": '',
		"check": 0
	}
] 

function getResult(e) {

	e.preventDefault();
	
	questions.forEach(question => {

		let rightcnt = 0;
		let wrongcnt = 0;

		let a = e.target.elements.namedItem(question.id);

		let answers = Array.from(a);
		let checked = answers.filter(element => element.checked == true);

		for(i = 0; i < checked.length; i++)
		{
			for(k = 0; k < question.right.length; k++)
			{
				if(checked[i].value === question.right[k]){ rightcnt++; }							
			}						
		}

		if(rightcnt === (question.right.length)){rightscore++;}

		if(checked.length > question.right.length){rightscore--;}
	});

	wrongscore = questions.length - rightscore;

	let div = document.getElementById("qdiv");
	div.remove();

	document.body.append("Правильных ответов: " + rightscore, document.createElement('p'));
	document.body.append("Неправильных ответов: " + wrongscore, document.createElement('p'));
}

function showQuestionsHTML(questions) {

	let qdiv = document.createElement('div');
	qdiv.id = "qdiv";

	let qform = document.createElement('form');
	qform.setAttribute('name', "qform");
	qform.onsubmit = getResult;

	qdiv.append(qform);
	document.body.append(qdiv);

	questions.forEach(showQuestionHTML);

	let qbutton = document.createElement('input');
	qbutton.setAttribute('name', "qbutton");
	qbutton.setAttribute('type', "submit");
	qbutton.setAttribute('value', "Отправить");

	qform.append(qbutton, document.createElement('p'));	
	document.forms.qform.qbutton.disabled = true;
}

function showQuestionHTML(question, index)
{
	document.forms.qform.append(question.title, document.createElement('p'));

	let type = question.right.length > 1 ? "checkbox": "radio";
	
	question.answers
	.map(answer => createLabels(answer, index, question, type))
	.forEach(question => document.forms.qform.append(question, document.createElement('p')));	
	
}

function onChange(e)
{
	questions.forEach((question, index) => {
		
		if(e.target.name === "question"+index) {

			if(e.target.checked)
				question.check++;
			else
				question.check--;
		}		
	});

	let disabled = questions.filter(element => { return element.check === 0 });

	if(disabled.length === 0)
		document.forms.qform.qbutton.disabled = false;
	else
		document.forms.qform.qbutton.disabled = true;
}

function createLabels(answer, index, question, type)
{
	let qlabel = document.createElement('label');

	let qcheckbox = document.createElement('input');
	qcheckbox.setAttribute('type', type);

	qcheckbox.setAttribute('name', "question" + index);
	qcheckbox.onclick = onChange;
	question.id = "question" + index;
	qcheckbox.setAttribute('value', answer);

	qlabel.append(qcheckbox);
	qlabel.append(answer);

	return qlabel;
}

showQuestionsHTML(questions);