interface ButtonSignInProps {
    name: string;
}

function ButtonSignIn({ name }: ButtonSignInProps) {
    return (
        <div className='d-flex justify-content-center my-5'>
            <button className='button' type='submit'>
                {name}
            </button>
        </div>
    );
}

export default ButtonSignIn;