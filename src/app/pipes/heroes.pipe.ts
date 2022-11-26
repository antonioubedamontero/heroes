import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroesPipe'
})
export class HeroesPipe implements PipeTransform {

  transform(colId: string): string {
    switch (colId) {
      case 'id':
        return 'Id'
      case 'name':
        return 'Nombre'
      case 'gender':
        return 'Género'
      case 'isHuman':
        return 'Humano'
      case 'superPowers':
        return 'Súper Poderes';
      case 'team':
        return 'Equipo';
      default:
        return 'Indefinido';
    }
  }
}
