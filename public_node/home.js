$("#register-form").submit((event)=>{
    event.preventDefault()
    const data = {username:$("#username-register").val(), password:$("#password-register").val()}
    fetch("/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })
    .catch(function(error) {
        console.error('Error', error)
    })  
})

$("#login-form").submit((event)=>{
    event.preventDefault()
    const data = {username:$("#username-login").val(), password:$("#password-login").val()}
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })
    .catch(function(error) {
        console.error('Error', error)
    })  
})
