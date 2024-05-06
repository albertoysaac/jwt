class User {
    
    constructor(name = '', last_name = '', birthday = null, email, password, password_confirmation = '') {
        this.name = name;
        this.last_name = last_name;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }

    get email() {
        return this.email;
    }
    
    validateLogin() {
        if (!this.email.includes('@') || !this.email.length <= 10) {
            throw new Error('Email o password no validos');
        }
    }


    validateNewUser() {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/;
        if (!this.name.length < 3 || !this.name.length > 50) {
            throw new Error('El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras');
        }
        if (!this.last_name.length < 3 || !this.last_name.length > 50) {
            throw new Error('El apellido debe tener entre 3 y 50 caracteres y solo puede contener letras');
        }
        if (!this.birthday) {
            throw new Error('La fecha de nacimiento no puede ser nula');
        }
        if (!this.email.includes('@') || !this.email.length <= 10) {
            throw new Error('El email debe tener un formato válido');
        }
        if (!passwordRegex.test(this.password)) {
            if(this.password != this.password_confirmation){
                throw new Error('Las contraseñas no coinciden');
            }
            throw new Error('La contraseña debe tener entre 8 y 50 caracteres, al menos un número y un carácter especial');

        }
        return true;
    }
}

export default User;