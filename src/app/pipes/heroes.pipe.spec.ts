import { HeroesPipe } from './heroes.pipe';

describe('- HeroesPipe (Pipe for translate heroes columns)', () => {
  const pipe = new HeroesPipe(); 

  it('✔️ Create an instance of the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('✔️ Pipe can translate column name to Spanish', () => {
    const expectedResults = [
      { name: 'id', translatedname: 'Id' },
      { name: 'name', translatedname: 'Nombre' },
      { name: 'gender', translatedname: 'Género' },
      { name: 'isHuman', translatedname: 'Humano' },
      { name: 'superPowers', translatedname: 'Súper Poderes' },
      { name: 'team', translatedname: 'Equipo' },
      { name: 'options', translatedname: 'Opciones' },
      { name: 'other', translatedname: 'Indefinido' }
    ];

    for (const expectedResult of expectedResults) {
      expect(pipe.transform(expectedResult.name)).toBe(expectedResult.translatedname);
    }
  });
});
