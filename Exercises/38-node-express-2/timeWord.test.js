const {timeWord} = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  test('00:00', () => {
    const result = timeWord("00:00")
    expect(result).toBe('midnight');
  });
  test('00:12', () => {
    const result = timeWord("00:12")
    expect(result).toBe('twelve twelve am');
  });
  test('01:00', () => {
    const result = timeWord("01:00")
    expect(result).toBe("one o'clock am");
  });
  test('06:01', () => {
    const result = timeWord("06:01")
    expect(result).toBe('six oh one am');
  });
  test('06:10', () => {
    const result = timeWord("06:10")
    expect(result).toBe('six ten am');
  });
  test('06:18', () => {
    const result = timeWord("06:18")
    expect(result).toBe('six eighteen am');
  });
  test('06:30', () => {
    const result = timeWord("06:30")
    expect(result).toBe('six thirty am');
  });
  test('10:34', () => {
    const result = timeWord("10:34")
    expect(result).toBe('ten thirty four am');
  });
  test('12:00', () => {
    const result = timeWord("12:00")
    expect(result).toBe('noon');
  });
  test('12:09', () => {
    const result = timeWord("12:09")
    expect(result).toBe('twelve oh nine pm');
  });
  test('23:23', () => {
    const result = timeWord("23:23")
    expect(result).toBe('eleven twenty three pm');
  });
});