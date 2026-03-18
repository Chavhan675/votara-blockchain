exports.validateRegister = (data) => {

if(!data.name || !data.email || !data.password){
return "All fields are required"
}

if(data.password.length < 6){
return "Password must be at least 6 characters"
}

return null

}


exports.validateCandidate = (data) => {

if(!data.name || !data.party || !data.constituency){
return "Candidate name, party and constituency required"
}

return null

}