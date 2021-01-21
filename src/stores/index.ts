import CalculationStore from './calculationStore';
import CurrencyStore from './currencyStore';

const stores = {
  currenciesStore: new CurrencyStore(),
  calculationStore: new CalculationStore(),
};

export default stores;
