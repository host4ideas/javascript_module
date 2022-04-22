/*
    Ejemplos clases con propiedades privadas y estáticas
*/
console.log("\nEjemplos clases con propiedades privadas y estáticas\n");

// Esto no funciona
class BaseClassWithPrivateStaticField1 {
    #PRIVATE_STATIC_FIELD;

    basePublicStaticMethod() {
        this.#PRIVATE_STATIC_FIELD = 42;
        return this.#PRIVATE_STATIC_FIELD;
    }
}

class SubClass1 extends BaseClassWithPrivateStaticField1 {}

try {
    const newSubClass1 = new SubClass1();
    console.log(newSubClass1.basePublicStaticMethod());
} catch (e) {
    console.log(e);
}

// Esto no funciona
class BaseClassWithPrivateStaticField2 {
    static #PRIVATE_STATIC_FIELD;

    basePublicStaticMethod() {
        this.#PRIVATE_STATIC_FIELD = 42;
        return this.#PRIVATE_STATIC_FIELD;
    }
}

class SubClass2 extends BaseClassWithPrivateStaticField2 {}

try {
    const newSubClass2 = new SubClass2();
    console.log(newSubClass2.basePublicStaticMethod());
} catch (e) {
    console.log(e.message);
}

/*
    Ejemplos clases con métodos privados y estáticos
*/
console.log("\nEjemplos clases con métodos privados y estáticos\n");

// Esto funciona
class ClassWithPrivateStaticMethod {
    static #privateStaticMethod() {
        return 42;
    }

    static publicStaticMethod1() {
        return ClassWithPrivateStaticMethod.#privateStaticMethod();
    }

    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

console.log(ClassWithPrivateStaticMethod.publicStaticMethod1() === 42);
console.log(ClassWithPrivateStaticMethod.publicStaticMethod2() === 42);

// Esto no funciona
class Base {
    static #privateStaticMethod() {
        return 42;
    }
    static publicStaticMethod1() {
        return Base.#privateStaticMethod();
    }
    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

class Derived extends Base {}

console.log(Derived.publicStaticMethod1()); // 42
try {
    console.log(Derived.publicStaticMethod2()); // TypeError
} catch (e) {
    console.log(e.message);
}

/*
    Ejemplo con getters y setters privados
*/
console.log("\nEjemplo con getters y setters privados\n");

class ClassWithPrivateAccessor {
    #message;

    get #decoratedMessage() {
        return `✨${this.#message}✨`;
    }
    set #decoratedMessage(msg) {
        this.#message = msg;
    }

    constructor() {
        this.#decoratedMessage = "hello world";
        console.log(this.#decoratedMessage);
    }
}

new ClassWithPrivateAccessor();
// expected output: "✨hello worl​d✨"
