import SearchResults from "../components/searchResults";
import CurrencySelector from "../components/currencySelector";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

//Test to see if results component renders correctly
test('renders search results ', () => {
    render(<SearchResults />)
    //verify component's initial render
    expect(screen.getByText('Convert to')).toBeInTheDocument();
})

//Test to check if the convert button works
test('covert button', () => {
  render(<CurrencySelector />)
  //Simulate click event
  fireEvent.click(screen.getByText('Convert'))
  expect(screen.getByText('Last updated')).toBeInTheDocument();
})




