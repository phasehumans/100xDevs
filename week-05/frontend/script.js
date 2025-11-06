const API_BASE = 'http://localhost:3000/api/v1'

// --- small helpers ---
function el(id){ return document.getElementById(id) }
function show(node){ node.classList.remove('hidden') }
function hide(node){ node.classList.add('hidden') }

function toast(msg, timeout=3000){
	const t = el('toast')
	t.textContent = msg
	t.classList.remove('hidden')
	setTimeout(()=> t.classList.add('hidden'), timeout)
}

function setToken(token){
	if(token) localStorage.setItem('taskify_token', token)
	else localStorage.removeItem('taskify_token')
	updateAuthUI()
}
function getToken(){ return localStorage.getItem('taskify_token') }

// --- UI wiring ---
const signinForm = el('signin-form')
const signupForm = el('signup-form')
const showSigninBtn = el('show-signin')
const showSignupBtn = el('show-signup')
const appSection = el('app')
const authSection = el('auth')
const todosContainer = el('todos')
const tokenIndicator = el('user-token-indicator')

function updateAuthUI(){
	const token = getToken()
	if(token){
		hide(authSection)
		show(appSection)
		tokenIndicator.textContent = 'Signed in'
	}else{
		show(authSection)
		hide(appSection)
		tokenIndicator.textContent = 'Not signed in'
	}
}

// tabs
showSigninBtn.addEventListener('click', ()=>{
	showSigninBtn.classList.add('active')
	showSignupBtn.classList.remove('active')
	hide(signupForm); show(signinForm)
})
showSignupBtn.addEventListener('click', ()=>{
	showSignupBtn.classList.add('active')
	showSigninBtn.classList.remove('active')
	hide(signinForm); show(signupForm)
})

// --- API helpers ---
async function api(path, opts={}){
	const headers = opts.headers || {}
	headers['Content-Type'] = 'application/json'
	const token = getToken()
	if(token) headers['token'] = token // backend expects 'token' header

	const res = await fetch(API_BASE + path, Object.assign({}, opts, {headers}))
	const text = await res.text()
	try{ return JSON.parse(text) }catch(e){ return text }
}

// --- auth actions ---
el('btn-signup').addEventListener('click', async ()=>{
	const firstName = el('signup-first').value.trim()
	const lastName = el('signup-last').value.trim()
	const email = el('signup-email').value.trim()
	const password = el('signup-password').value
	if(!firstName||!lastName||!email||!password){ toast('All signup fields required'); return }

	const res = await api('/user/signup', {method:'POST', body: JSON.stringify({firstName,lastName,email,password})})
	toast(res && res.message ? res.message : 'Signed up')
	// switch to signin
	showSigninBtn.click()
})

el('btn-signin').addEventListener('click', async ()=>{
	const email = el('signin-email').value.trim()
	const password = el('signin-password').value
	if(!email||!password){ toast('Email and password required'); return }

	const res = await api('/user/signin', {method:'POST', body: JSON.stringify({email,password})})
	if(res && res.token){
		setToken(res.token)
		toast('Signed in')
		await loadTodos()
	}else{
		toast((res && res.message) || 'Sign-in failed')
	}
})

el('btn-signout').addEventListener('click', ()=>{
	setToken(null)
	toast('Signed out')
})

// --- todos ---
async function loadTodos(){
	todosContainer.innerHTML = 'Loading...'
	const res = await api('/user/todos', {method:'GET'})
	const list = (res && res.todos) || []
	renderTodos(list)
}

function renderTodos(list){
	todosContainer.innerHTML = ''
	if(!list.length){
		todosContainer.innerHTML = '<div class="empty">No todos yet</div>'
		return
	}

	list.forEach(t => {
		const card = document.createElement('div')
		card.className = 'todo'

		const title = document.createElement('div')
		title.className = 'todo-title'
		const cb = document.createElement('input')
		cb.type = 'checkbox'
		cb.checked = !!t.done
		cb.addEventListener('change', ()=> toggleDone(t, cb.checked))
		title.appendChild(cb)

		const txt = document.createElement('span')
		txt.textContent = t.title || '(no title)'
		if(t.done) txt.classList.add('done')
		title.appendChild(txt)

		const desc = document.createElement('div')
		desc.className = 'todo-desc'
		desc.textContent = t.description || t.descrption || ''

		const actions = document.createElement('div')
		actions.className = 'todo-actions'

		const editBtn = document.createElement('button')
		editBtn.textContent = 'Edit'
		editBtn.addEventListener('click', ()=> editTodo(t))

		const delBtn = document.createElement('button')
		delBtn.textContent = 'Delete'
		delBtn.addEventListener('click', ()=> deleteTodo(t._id))

		actions.appendChild(editBtn)
		actions.appendChild(delBtn)

		card.appendChild(title)
		card.appendChild(desc)
		card.appendChild(actions)
		todosContainer.appendChild(card)
	})
}

async function toggleDone(todo, done){
	await api('/todo', {method:'PUT', body: JSON.stringify({
		todoId: todo._id,
		title: todo.title,
		description: todo.description || todo.descrption || '',
		done: done
	})})
	await loadTodos()
}

async function editTodo(todo){
	const title = prompt('Title', todo.title) || todo.title
	const description = prompt('Description', todo.description || todo.descrption || '')
	await api('/todo', {method:'PUT', body: JSON.stringify({todoId: todo._id, title, description, done: !!todo.done})})
	await loadTodos()
}

async function deleteTodo(id){
	if(!confirm('Delete this todo?')) return
	await fetch(API_BASE + '/todo/' + id, {method:'DELETE', headers: { 'token': getToken() }})
	await loadTodos()
}

// create
el('todo-form').addEventListener('submit', async (e)=>{
	e.preventDefault()
	const title = el('todo-title').value.trim()
	const desc = el('todo-desc').value.trim()
	if(!title){ toast('Title required'); return }

	// backend expects 'descrption' spelling in POST route - include both to be safe
	const body = { title, descrption: desc, description: desc }
	const res = await api('/todo', {method:'POST', body: JSON.stringify(body)})
	toast(res && res.message ? res.message : 'Created')
	el('todo-title').value = ''
	el('todo-desc').value = ''
	await loadTodos()
})

// boot
updateAuthUI()
if(getToken()) loadTodos()
