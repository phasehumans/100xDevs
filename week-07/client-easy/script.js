// Frontend logic for simple Admin/User courses UI
const baseUrl = 'http://localhost:3000';

const $ = sel => document.querySelector(sel);

function showMessage(msg, type = 'info'){
	const el = $('#messages');
	el.textContent = msg;
	el.className = type;
	setTimeout(()=>{ el.textContent = ''; el.className = ''; }, 5000);
}

function setToken(kind, token){
	if(token) localStorage.setItem(kind+'Token', token);
	else localStorage.removeItem(kind+'Token');
}

function getToken(kind){
	return localStorage.getItem(kind+'Token');
}

async function apiFetch(path, opts = {}, tokenKey){
	const headers = opts.headers || {};
	headers['Content-Type'] = 'application/json';
	if(tokenKey){
		const t = getToken(tokenKey);
		if(t) headers['token'] = t;
	}
	const final = Object.assign({}, opts, { headers });
	const res = await fetch(baseUrl + path, final);
	let body;
	try { body = await res.json(); } catch(e){ body = null }
	return { ok: res.ok, status: res.status, body };
}

// Navigation
$('#nav-admin').addEventListener('click', ()=> showSection('admin'));
$('#nav-user').addEventListener('click', ()=> showSection('user'));

function showSection(name){
	document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
	document.getElementById('nav-'+name).classList.add('active');
	if(name === 'admin'){
		$('#admin-section').classList.remove('hidden');
		$('#user-section').classList.add('hidden');
	} else {
		$('#user-section').classList.remove('hidden');
		$('#admin-section').classList.add('hidden');
	}
}

// Admin actions
$('#admin-signup').addEventListener('click', async ()=>{
	const firstName = $('#admin-sign-first').value.trim();
	const lastName = $('#admin-sign-last').value.trim();
	const email = $('#admin-sign-email').value.trim();
	const password = $('#admin-sign-pass').value.trim();
	if(!firstName || !lastName || !email || !password){ showMessage('Please fill signup fields','error'); return }
	const r = await apiFetch('/admin/signup', { method: 'POST', body: JSON.stringify({ firstName, lastName, email, password }) });
	showMessage(r.body && r.body.message ? r.body.message : 'signed up');
});

$('#admin-login').addEventListener('click', async ()=>{
	const email = $('#admin-login-email').value.trim();
	const password = $('#admin-login-pass').value.trim();
	if(!email || !password){ showMessage('Please fill login fields','error'); return }
	const r = await apiFetch('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
	if(r.body && r.body.token){
		setToken('admin', r.body.token);
		showMessage('Admin logged in');
		loadAdminCourses();
	} else {
		showMessage(r.body && r.body.message ? r.body.message : 'login failed','error');
	}
});

$('#admin-logout').addEventListener('click', ()=>{
	setToken('admin', null);
	$('#admin-courses').innerHTML = '';
	showMessage('Admin logged out');
});

$('#create-course').addEventListener('click', async ()=>{
	const title = $('#course-title').value.trim();
	const description = $('#course-desc').value.trim();
	const price = Number($('#course-price').value || 0);
	if(!title){ showMessage('Title required','error'); return }
	const r = await apiFetch('/admin/courses', { method: 'POST', body: JSON.stringify({ title, description, price }) }, 'admin');
	if(r.body && r.body.courseId){
		showMessage('Course created');
		$('#course-title').value = ''; $('#course-desc').value = ''; $('#course-price').value='';
		loadAdminCourses();
	} else {
		showMessage(r.body && r.body.message ? r.body.message : 'create failed','error');
	}
});

async function loadAdminCourses(){
	const r = await apiFetch('/admin/courses', { method: 'GET' }, 'admin');
	const list = $('#admin-courses');
	list.innerHTML = '';
	if(r.body && r.body.course && Array.isArray(r.body.course)){
		r.body.course.forEach(c=>{
			const li = document.createElement('li');
			li.innerHTML = `<strong>${escapeHtml(c.title)}</strong> ${c.price ? ' - $'+c.price : ''}<p>${escapeHtml(c.description||'')}</p>`;
			list.appendChild(li);
		});
	} else {
		list.innerHTML = '<li>No courses</li>';
	}
}

// User actions
$('#user-signup').addEventListener('click', async ()=>{
	const firstName = $('#user-sign-first').value.trim();
	const lastName = $('#user-sign-last').value.trim();
	const email = $('#user-sign-email').value.trim();
	const password = $('#user-sign-pass').value.trim();
	if(!firstName || !lastName || !email || !password){ showMessage('Please fill signup fields','error'); return }
	const r = await apiFetch('/users/signup', { method: 'POST', body: JSON.stringify({ firstName, lastName, email, password }) });
	showMessage(r.body && r.body.message ? r.body.message : 'signed up');
});

$('#user-login').addEventListener('click', async ()=>{
	const email = $('#user-login-email').value.trim();
	const password = $('#user-login-pass').value.trim();
	if(!email || !password){ showMessage('Please fill login fields','error'); return }
	const r = await apiFetch('/users/login', { method: 'POST', body: JSON.stringify({ email, password }) });
	if(r.body && r.body.token){
		setToken('user', r.body.token);
		showMessage('User logged in');
		loadUserCourses();
	} else {
		showMessage(r.body && r.body.message ? r.body.message : 'login failed','error');
	}
});

$('#user-logout').addEventListener('click', ()=>{
	setToken('user', null);
	$('#user-courses').innerHTML = '';
	showMessage('User logged out');
});

async function loadUserCourses(){
	const r = await apiFetch('/users/courses', { method: 'GET' }, 'user');
	const list = $('#user-courses');
	list.innerHTML = '';
	if(r.body && r.body.courses && Array.isArray(r.body.courses)){
		r.body.courses.forEach(c=>{
			const li = document.createElement('li');
			li.innerHTML = `<strong>${escapeHtml(c.title)}</strong> ${c.price ? ' - $'+c.price : ''}<p>${escapeHtml(c.description||'')}</p>`;
			list.appendChild(li);
		});
	} else {
		list.innerHTML = '<li>No courses</li>';
	}
}

function escapeHtml(s){
	if(!s) return '';
	return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Init: if tokens exist, load appropriate lists
window.addEventListener('load', ()=>{
	if(getToken('admin')) loadAdminCourses();
	if(getToken('user')) loadUserCourses();
});