"use client"

export default function HelpPage(){

return(

<div className="min-h-screen bg-gray-100 px-6 py-16">

<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

<h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
Help & Support
</h1>

<p className="text-gray-600 text-center mb-10">
Welcome to the Votara Blockchain Voting System help center.
Here you can learn how to register, vote, and manage elections.
</p>

<div className="space-y-6">

{/* Registration Help */}

<div className="border rounded-lg p-5">

<h2 className="text-xl font-semibold mb-2">
1. How to Register
</h2>

<p className="text-gray-600">
Go to the Register page and enter your name, email, voter ID, and password.
After registration, wait for the admin to approve your voter account.
</p>

</div>

{/* Login Help */}

<div className="border rounded-lg p-5">

<h2 className="text-xl font-semibold mb-2">
2. How to Login
</h2>

<p className="text-gray-600">
Use your registered email and password to login.
After login you will be redirected to your voter dashboard.
</p>

</div>

{/* Voting Help */}

<div className="border rounded-lg p-5">

<h2 className="text-xl font-semibold mb-2">
3. How to Vote
</h2>

<p className="text-gray-600">
Go to the Vote page, connect your wallet, and select your preferred candidate.
Your vote will be securely recorded on the blockchain.
</p>

</div>

{/* Admin Help */}

<div className="border rounded-lg p-5">

<h2 className="text-xl font-semibold mb-2">
4. Admin Controls
</h2>

<p className="text-gray-600">
Admins can manage voters, add candidates, and control the election process
through the admin dashboard.
</p>

</div>

{/* Contact */}

<div className="border rounded-lg p-5">

<h2 className="text-xl font-semibold mb-2">
5. Need More Help?
</h2>

<p className="text-gray-600">
If you face any issues, please contact the election administrator
or support team.
</p>

</div>

</div>

</div>

</div>

)

}