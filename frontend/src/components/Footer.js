export default function Footer(){

return(

<footer className="bg-gray-900 text-white mt-10">

<div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

{/* Project Info */}

<div>

<h2 className="text-lg font-semibold mb-2">
Votara
</h2>

<p className="text-gray-400 text-sm">
Secure blockchain based voting system designed
for transparent and tamper-proof elections.
</p>

</div>

{/* Navigation */}

<div>

<h2 className="text-lg font-semibold mb-2">
Quick Links
</h2>

<ul className="space-y-1 text-gray-400 text-sm">

<li>
<a href="/" className="hover:text-white">
Home
</a>
</li>

<li>
<a href="/candidates" className="hover:text-white">
Candidates
</a>
</li>

<li>
<a href="/results" className="hover:text-white">
Results
</a>
</li>

<li>
<a href="/help" className="hover:text-white">
Help
</a>
</li>

</ul>

</div>

{/* Contact */}

<div>

<h2 className="text-lg font-semibold mb-2">
Support
</h2>

<p className="text-gray-400 text-sm">
For issues or queries contact the election
administrator.
</p>

</div>

</div>

{/* Bottom Bar */}

<div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">

© {new Date().getFullYear()} Votara Blockchain Voting System

</div>

</footer>

)

}