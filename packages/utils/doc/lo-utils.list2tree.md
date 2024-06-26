<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [lo-utils](./lo-utils.md) &gt; [list2Tree](./lo-utils.list2tree.md)

## list2Tree() function

> This API is provided as a beta preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.

列表转换为树结构

**Signature:**

```typescript
export declare function list2Tree<T extends Record<string, any>>(
  list: T[],
  fields?: {
    children?: string
    id?: string | number
    parentId?: string
  },
): T[]
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

list

</td><td>

T\[\]

</td><td>

list

</td></tr>
<tr><td>

fields

</td><td>

{ children?: string; id?: string \| number; parentId?: string; }

</td><td>

_(Optional)_ default as children = 'children' , id = 'id', parentId = 'parentId'

</td></tr>
</tbody></table>
**Returns:**

T\[\]
