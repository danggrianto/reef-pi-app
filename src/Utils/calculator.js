// CALCIUM CALCULATOR

const current = 400 //ppm measure it by test it
const target = 420 //ppm get by the standard
const volume = 45 //L volume of aquarium in liter

const solute = 5 //gram see direction
const solvent = 250 //mL

const calculator  = () => {
    // calculate mg needed of solute in mg
    // 1 ppm = 1mg/L
    const delta = (target - current) * volume 

    // calculate solution concentration in mg/mL
    const solution  = solute / solvent * 1000

    // calculate dosing needed in mL
    const dosing = delta / solution
    return dosing
}

console.log(calculator())