import React, { useState } from 'react'
import Welcome from './Welcome'
import ToS from './ToS'
import axios from 'axios'
import camera from './images/camera.png'
import setUserData from './lib/setUserData'
import { useHistory } from 'react-router-dom'
import config from './config'
import aws from 'aws-sdk'

export default function Register({ showToast }) {

    const uploadRef = React.createRef()
    // const SERVERURL = config.SERVERURL

    const [showToS, setShowToS] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const history = useHistory()

    setInterval(() => {
        if (uploadRef.current && uploadRef.current.value) setIsUploaded(true)
    }, 500)

    const submit = e => {
        e.preventDefault()
        const avatar = uploadImg()
        createUser(e, avatar)
    }

    const createUser = async (e, avatar) => {
        const email = e.currentTarget.childNodes[2].value
        const password = e.currentTarget.childNodes[3].value
        const name = e.currentTarget.childNodes[4].value
        try {
            const res = await axios.post(`http://localhost:8080/register`, {
                email: email,
                name: name,
                password: password,
                avatar: avatar
            })
            setUserData(res.data.data)
            history.push('/')
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const uploadImg = () => {

        const file = uploadRef.current.files[0]

        aws.config.update({
            accessKeyId: config.AWSKEY,
            secretAccessKey: config.AWSSECRET
        });

        const s3 = new aws.S3({
            endpoint: 's3-us-east-2.amazonaws.com',
            signatureVersion: 'v4',
            region: 'us-east-2'
        });

        const params = {
            Bucket: 'paws-images',
            Key: file.name,
            Expires: 60,
            ContentType: file.type
        };

        s3.getSignedUrl('putObject', params, function (err, signedUrl) {
            if (err) {
                console.log(err);
                return err;
            } else {
                var instance = axios.create()

                instance.put(signedUrl, file, { headers: { 'Content-Type': file } })
                    .catch(function (err) {
                        console.log(err)
                    });
            }
        })
        return `https://${params.Bucket}.${s3.endpoint.host}/${params.Key}`
    }

    return (

        <div className='register'>

            {showToS &&
                <ToS show={setShowToS} />}

            <Welcome />

            <div className='register-main'>

                <p className='page-title'>Create New Account</p>

                <form className='reg-form'
                    onSubmit={e => submit(e)}
                >
                    <div
                        onClick={() => !isUploaded && uploadRef.current.click()}
                        className='upload-userpic'>
                        {!isUploaded && <img src={camera} alt='' />}
                        <p className={`upload-text ${isUploaded}`}>{isUploaded ? 'Uploaded!' : 'Upload Profile Picture'}</p>
                    </div>

                    <input ref={uploadRef} type='file' accept='.jpg, .jpeg, .png' required></input>

                    <input
                        placeholder='Email'
                        type='email'
                        name='email'
                        required
                    ></input>

                    <input
                        placeholder='Create Password'
                        type='password'
                        name='password'
                        required
                    ></input>

                    <input
                        placeholder='Full Name'
                        name='name'
                        type='text'
                        required
                    ></input>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type='checkbox' required></input>
                        <p className='accept-terms'>By clicking here you accept the
                        <span
                                onClick={() => setShowToS(true)}
                            >Terms and  Conditions.</span>
                        </p>
                    </div>

                    <button className='green-button'>Sign Up</button>

                </form>

            </div>

        </div>
    )
}