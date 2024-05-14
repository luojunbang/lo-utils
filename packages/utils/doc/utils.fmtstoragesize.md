<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lo/utils](./utils.md) &gt; [fmtStorageSize](./utils.fmtstoragesize.md)

## fmtStorageSize() function

格式化存储大小

**Signature:**

```typescript
export declare function fmtStorageSize(val: string | number, unit?: string): string
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

val

</td><td>

string \| number

</td><td>

The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p

</td></tr>
<tr><td>

unit

</td><td>

string

</td><td>

_(Optional)_ accept targetUnit ex.'k','K','Kb'

</td></tr>
</tbody></table>
**Returns:**

string

## Example

('2048K','m') returns '2m'