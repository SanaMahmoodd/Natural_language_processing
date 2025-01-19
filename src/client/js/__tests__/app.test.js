const isValidURL = (url) => {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    return regex.test(url);
  };
  
  test('Validates URL correctly', () => {
    expect(isValidURL('https://example.com')).toBe(true);
    expect(isValidURL('invalid-url')).toBe(false);
    expect(isValidURL('http://localhost:3001')).toBe(true);
  });
  