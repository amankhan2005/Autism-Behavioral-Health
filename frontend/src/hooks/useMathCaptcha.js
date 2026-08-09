import { useCallback, useState } from 'react';

// Simple, human-solvable arithmetic. Every generated question resolves to a
// clean non-negative integer answer so users are never asked for decimals.
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateQuestion() {
  const ops = ['+', '−', '×', '÷'];
  const symbol = ops[rand(0, ops.length - 1)];
  let a;
  let b;
  let answer;

  switch (symbol) {
    case '+':
      a = rand(1, 12);
      b = rand(1, 12);
      answer = a + b;
      break;
    case '−':
      a = rand(6, 15);
      b = rand(1, a); // keep the result non-negative
      answer = a - b;
      break;
    case '×':
      a = rand(2, 9);
      b = rand(2, 9);
      answer = a * b;
      break;
    case '÷':
    default:
      b = rand(2, 9);
      answer = rand(2, 9);
      a = b * answer; // guarantees a clean integer quotient
      break;
  }

  return { a, b, symbol, answer, prompt: `${a} ${symbol} ${b}` };
}

// Manages a random math question and the user's answer.
// - `solved` is true only when the typed answer matches.
// - `regenerate` swaps in a fresh question and clears the input (use after a
//   successful submit, or when the user taps the refresh control).
// - `fieldProps` is spread straight onto <MathCaptcha />.
export function useMathCaptcha() {
  const [question, setQuestion] = useState(generateQuestion);
  const [value, setValue] = useState('');

  const solved = value.trim() !== '' && Number(value) === question.answer;
  const showError = value.trim() !== '' && !solved;

  const regenerate = useCallback(() => {
    setQuestion(generateQuestion());
    setValue('');
  }, []);

  const onChange = useCallback((e) => {
    // Allow only digits and an optional leading minus sign.
    setValue(e.target.value.replace(/[^\d-]/g, ''));
  }, []);

  return {
    solved,
    regenerate,
    fieldProps: {
      prompt: question.prompt,
      value,
      onChange,
      onRefresh: regenerate,
      error: showError ? 'Incorrect answer. Please try again.' : '',
    },
  };
}
