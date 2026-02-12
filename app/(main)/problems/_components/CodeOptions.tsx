'use client';

import * as React from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CodeOptons({
  language,
  setLanguageAction,
}: {
  language: string;
  setLanguageAction: (val: string) => void;
}) {
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field>
        <FieldLabel>语言</FieldLabel>
        <Select value={language} onValueChange={setLanguageAction}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="nodejs">NodeJS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
