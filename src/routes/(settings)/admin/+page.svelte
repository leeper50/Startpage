<script lang="ts">
  export let data;
  let { user, users } = data;
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import type { TableSource } from "@skeletonlabs/skeleton";
  const tableSimple: TableSource = {
    head: ["Name", "Admin", "ID"],
    body: tableMapperValues(users, ["name", "isAdmin", "id"]),
  };
</script>

<div class="h-full w-full bg-surface-600 pt-4 flex justify-center">
  <div class="container">
    <Table
      source={tableSimple}
      interactive={true}
      on:selected={(e) => (window.location.href = `/admin/user/${e.detail[2]}`)}
    />
  </div>
</div>
