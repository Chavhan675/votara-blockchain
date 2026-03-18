export default function AboutPage(){

return(

<div className="min-h-screen bg-gray-100 px-6 py-16">

<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

<h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
About Digital Election Platform
</h1>

<p className="text-gray-600 mb-4">
The Digital Election Platform is a blockchain-powered voting
system designed to ensure secure, transparent, and tamper-proof
elections.
</p>

<p className="text-gray-600 mb-4">
Our system uses blockchain technology to record votes securely
while maintaining voter privacy and preventing manipulation.
Each vote is recorded immutably, ensuring trust in the election
process.
</p>

<p className="text-gray-600 mb-4">
The platform allows voters to register, verify their identity,
connect their blockchain wallet, and cast their vote digitally
from anywhere while maintaining the integrity of the democratic
process.
</p>

<div className="mt-8">

<h2 className="text-xl font-semibold text-blue-900 mb-2">
Key Features
</h2>

<ul className="list-disc ml-6 text-gray-600 space-y-2">

<li>Secure blockchain-based voting</li>
<li>One person, one vote guarantee</li>
<li>Transparent election results</li>
<li>Real-time vote tracking</li>
<li>Admin-controlled election management</li>

</ul>

</div>

</div>

</div>

)

}