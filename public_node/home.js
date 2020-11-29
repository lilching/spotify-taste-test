$("#register-form").submit((event)=>{
    event.preventDefault()
    const data = {username:$("#username-register").val(), password:$("#password-register").val()}
    // console.log(data.password)
    // console.log(data.username)
    // console.log(data)
    fetch("/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
})