<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [lo-utils](./lo-utils.md) &gt; [generatorDate](./lo-utils.generatordate.md)

## generatorDate() function

Format a date/time with customizable formatting options. (y:year m:month d:day h:hour i:minutes s:second a:weekday w:week e:millisecond)

**Signature:**

```typescript
export declare function generatorDate(date: any, formatter?: string): string
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

date

</td><td>

any

</td><td>

Date object, string, or timestamp

</td></tr>
<tr><td>

formatter

</td><td>

string

</td><td>

_(Optional)_ Format string (default: 'y-m-d h:i:s')

</td></tr>
</tbody></table>
**Returns:**

string

## Example

```
generatorDate('2020-01-01') // '2020-01-01 00:00:00 五'
generatorDate('2020-01-01','ymdhis.e 星期a 第w周') // '20200101000000.000 星期五 第w周'
```
