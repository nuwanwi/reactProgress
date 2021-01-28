import { render, screen } from '@testing-library/react';
import Home from './Pages/Home';


import ProgressOperation from "./Utils/ProgressOperation"


describe('#UI unit testing', () => {
test('Checking the page render  for the text', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Progress Bars Demo/i);
  expect(linkElement).toBeInTheDocument();
});
 })


describe('#getProgressChangeValue() Progress value calculation', () => {
  it('Checking  progress limit when the value is more than limit',()=>{
     expect(ProgressOperation.getProgressChangeValue(200,100,300)).toBe(200);
    })

    it('Checking  progress limit when the value is less than limit',()=>{
      expect(ProgressOperation.getProgressChangeValue(200,50,80)).toBe(130);
     })

     it('Checking  progress limit when the value equals the limit',()=>{
      expect(ProgressOperation.getProgressChangeValue(200,100,100)).toBe(200);
     })

     it('Checking  progress limit when the value equals zero',()=>{
      expect(ProgressOperation.getProgressChangeValue(200,-100,100)).toBe(0);
     })

     it('Checking  progress limit when the value less than zero',()=>{
      expect(ProgressOperation.getProgressChangeValue(200,-101,100)).toBe(0);
     })
  })

  describe('#getProgressColour() Progress colour computation', () => {

    it('Checking  progress colour when the value is less than 100',()=>{
       expect(ProgressOperation.getProgressColour(50)).toBe("#00695c");
      })

      it('Checking  progress colour when the value equals 100',()=>{
        expect(ProgressOperation.getProgressColour(100)).toBe("#FF0000");
       })

       it('Checking  progress colour when the value more than 100',()=>{
        expect(ProgressOperation.getProgressColour(100)).toBe("#FF0000");
       })

    })