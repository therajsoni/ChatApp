const [username,setusername] = useState('');
const [password,setPassword] = useState('');
const [accessToken,setAccessToken] = useState('');
const [refreshToken,setRefreshToken] = useState('');

const handleLogin = async() => {
const response = await fetch('http://localhost:5000/login',{
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json' 
    },
    body : JSON.stringify({username,password})   
});
const data = await response.json();
if(response.ok){
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('refreshToken',data.refreshToken);
}
else{
    alert('not here it!')
}
}

const fetchProtectedData = async() => {
    
}