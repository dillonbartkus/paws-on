import React from 'react'

export default function({ show }) {

    return(
        
        <div className = 'tos'>

            <div className = 'close-tos'
            onClick = { () => show(false) }
            >X</div>

            <p>Please read these terms of service carefully before using Paws-On website (the "service") operated by Dillon Bartkus ("us", 'we", "our").</p>

            <p>Conditions of Use</p>

            <p>We will provide our service to you, which are subject to the conditions stated below in this document. Every time you visit this website, you accept the following conditions. This is why we urge you to read them carefully.</p>

            <p>Privacy Policy</p>

            <p>Whenever you create a post on our service, you agree to have your name and email address displayed publicly.</p>

            <p>Communications</p>

            <p>By creating a post on our service, you agree to possibly being contacted via email regarding your post by other users of our service. Any communication via email between users of our service is not monitored or regulated by us, and is therefore subject to the discretion of the communicating parties. By contacting another user of our service, you do so at your own risk. We are not responsible for any negative discourse or other liabilities caused by communication between users.</p>

            <p>Applicable Law</p>

            <p>By visiting this website, you agree to use our service in good will. The purpose of our service is to help users coordinate their efforts in helping recover / rescue homeless or lost animals. By using our service, you must abide by these guidelines. Any user who is caught using information on our service for the purpose of harming or otherwise endangering said animals will be punished to the full extent of the law.</p>

            <p>Comments, Reviews, and Emails</p>

            <p>Visitors may post content as long as it is intended to help others find, rescue, and/or otherwise help lost or homeless animals. Any content that does not follow this purpose or any content that is obscene, illegal, defamatory, threatening, or otherwise off-topic will be deleted.

            We reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant [name] non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.</p>

            <p>License and Site Access</p>

            <p>We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.</p>

            <p>User Account</p>

            <p>If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.

            We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.</p>

        </div>
    )
}