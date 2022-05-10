import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { RequestPick } from "../models/pick.model";

@ValidatorConstraint({ async: true })
export class AtLeastOnePickConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    return picks ? picks.length >= 1 : false;
  }
}

@ValidatorConstraint({ async: true })
export class PowerballIsNotEmptyConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      if (pick.powerball == null || pick.powerball == undefined) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class PowerballIsNumberConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      if (!Number.isInteger(pick.powerball)) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class PowerballInRangeConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      if (pick.powerball < 1 || pick.powerball > 26) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class NumbersAreInRangeConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      pick.numbers.forEach(number => {
        if (number < 1 || number > 69) {
          validation = false;
          return;
        }
      })
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class NumbersAreNotEmptyConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      if (pick?.numbers == null || pick?.numbers == undefined) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class NumbersAreNotDuplicatedConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      const duplicated = new Set(pick.numbers);
      if (duplicated.size !== pick.numbers.length) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class NumbersAreIntegersConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      pick.numbers.forEach(number => {
        if (!Number.isInteger(number)) {
          validation = false;
          return;
        }
      })
    });
    return validation;
  }
}

@ValidatorConstraint({ async: true })
export class NumbersLengthConstraint implements ValidatorConstraintInterface {
  validate(picks: Array<RequestPick>) {
    let validation = true;
    picks.forEach(pick => {
      if (pick.numbers.length < 5 || pick.numbers.length > 5) {
        validation = false;
        return;
      }
    });
    return validation;
  }
}

export function PowerballIsNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PowerballIsNotEmptyConstraint,
    });
  };
}

export function PowerballIsNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PowerballIsNumberConstraint,
    });
  };
}

export function PowerballInRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PowerballInRangeConstraint,
    });
  };
}

export function AtLeastOnePick(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOnePickConstraint,
    });
  };
}

export function NumbersAreInRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NumbersAreInRangeConstraint,
    });
  };
}

export function NumbersAreIntegers(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NumbersAreIntegersConstraint,
    });
  };
}

export function NumbersAreNotDuplicated(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NumbersAreNotDuplicatedConstraint,
    });
  };
}

export function NumbersLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NumbersLengthConstraint,
    });
  };
}

export function NumbersAreNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NumbersAreNotEmptyConstraint,
    });
  };
}