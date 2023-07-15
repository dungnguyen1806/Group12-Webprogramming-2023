import React from 'react'

export default function Footer() {
    return (
        <div className="footer">
            <h1>Save time, save money!</h1>
            <span>Sign up and we'll send the best deals to you</span>
            <div className="footer-input">
                <input type="text" placeholder="Your Email" />
                <button>Subscribe</button>
            </div>
        </div>
    )
}
