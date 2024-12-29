const ColoredNumbers = ({ numbers }: { numbers: any }) => {
    if (!numbers || !numbers.length) {
      return null;
    }
    
    // Разбиваем строку на массив символов
    const numberArray = numbers.split('');
  
    // Создаем элементы span для каждого символа с нужным цветом
    const coloredElements = numberArray.map((number: any) => {
      let color;
      
      switch (number) {
        case '0':
          color = 'gray'; // Серый цвет для 0
          break;
        case '2':
          color = 'ffae42'; // Желтый цвет для 2
          break;
        case '4':
          color = '#db8b00'; // Оранжевый цвет для 4
          break;
        default:
          color = 'black'; // Черный цвет для всех остальных символов
      }
  
      return <span key={number} style={{ color }}>{number}</span>;
    });
  
    return <>{coloredElements}</>;
  };
export default ColoredNumbers;