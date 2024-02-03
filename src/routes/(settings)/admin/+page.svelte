<script lang="ts">
  export let data;
  let { user, users } = data;
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import type { TableSource } from "@skeletonlabs/skeleton";
  const tableSimple: TableSource = {
    head: ["Email", "Admin"],
    body: tableMapperValues(users, ["email", "isAdmin"]),
  };
  /*
    TODO
    get and show all user accounts
    only show minimal info
    make thing to delete user
    */
</script>

<div class="h-full w-full bg-surface-500">
  <div class="container">
    <Table source={tableSimple} />
    <p class="text-primary-500 break-words">
      {JSON.stringify(users)}
    </p>
  </div>
</div>
