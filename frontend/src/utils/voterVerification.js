// check if voter is verified
export const isVoterVerified = (voter) => {
  return voter?.verified === true
}

// check if voter already voted
export const hasVoted = (voter) => {
  return voter?.hasVoted === true
}

// check if voter is eligible to vote
export const canVote = (voter, electionStatus) => {

  if(!voter) return false

  if(!voter.verified) return false

  if(voter.hasVoted) return false

  if(electionStatus !== "active") return false

  return true
}

// simple voter id validation
export const validateVoterId = (id) => {

  if(!id) return false

  if(id.length < 5) return false

  return true
}